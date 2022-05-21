import React, { useEffect } from "react";
import Color from "color";
import Graph from "react-graph-vis";
import { colors } from "../utils/colors";
import { v4 as uuidv4 } from "uuid";

export const GraphUI = (props) => {
  const [graph, setGraph] = React.useState("");
 
  let network = {};
  function randomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    return `#${red}${green}${blue}`;
  }
  React.useEffect(() => {
    const {
      res: { result: transactions },
    } = props;
    if (!transactions) return;
    const graphStart = { nodes: [], edges: [] };

    transactions.map((transaction, index) => {
      let notAdd = false;
      let notAddTo = false;
      let notAddFrom = false;
      graphStart.nodes.map((node, i) => {
        if (node.id === transaction.from || node.id === transaction.to)
          notAdd = true;
        if (node.id === transaction.to) notAddTo = true;
        if (node.id === transaction.from) notAddFrom = true;
      });
      !notAdd &&
        !notAddFrom &&
        graphStart.nodes.push({
          id: transaction.from,
          label: transaction.from,
          title: `gas : ${transaction.gas}`,
        });
      !notAddTo &&
        !notAddTo &&
        graphStart.nodes.push({
          id: transaction.to,
          label: transaction.to,
          title: `gas : ${transaction.gas}`,
        });

      graphStart.edges.push({
        from: transaction.from,
        to: transaction.to,
        color: randomColor(),
      });
    });
    graphStart.nodes = graphStart.nodes.map((c, i) => ({
      ...c,
      color: {
        border: Color(colors[i]).darken(0.2).hex(),
        background: colors[i],
        highlight: {
          border: Color(colors[i]).darken(0.3).hex(),
          background: Color(colors[i]).darken(0.2).hex(),
        },
        hover: {
          border: Color(colors[i]).darken(0.3).hex(),
          background: Color(colors[i]).darken(0.2).hex(),
        },
      },
    }));
    graphStart.edges = graphStart.edges.map((e) => ({
      ...e,
      width: 0.6,
      color: { opacity: 0.8 },
    }));
    setGraph({ ...graphStart, selected: [] });
  }, [props]);

  useEffect(() => {
    if (!graph) return;
    console.log("usesTATE graphStart", graph);
  }, [graph]);

  const options = {
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 40,
        nodeSpacing: 300,
        treeSpacing: 100,
        blockShifting: true,
        edgeMinimization: true,
        direction: "LR",
        sortMethod: "hubsize",
      },
    },
    height: "600px",
    edges: {
      smooth: {
        enabled: true,
        type: "dynamic",
        roundness: 1,
      },
      arrows: {
        from: {
          enabled: true,
          scaleFactor: 0.7,
        },
        to: {
          enabled: true,
        },
      },
    },
    nodes: {
      shape: "box",
      font: {
        face: "Circular, Futura",
        color: "#fff",
        size: 15,
      },
      color: {
        border: "red",
      },
      margin: {
        top: 7,
        bottom: 7,
        left: 10,
        right: 10,
      },
      mass: 1,
    },
    physics: {
      hierarchicalRepulsion: {
        centralGravity: 1,
        springLength: 200,
        springConstant: 0.1,
        nodeDistance: 150,
        damping: 1,
      },
      maxVelocity: 500,
      minVelocity: 3,
      solver: "barnesHut",
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true,
      },
      timestep: 0.5,
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      multiselect: true,
      dragView: false,
      zoomView: false,
    },
  };
  const refreshSelection = (selected) => {

    setGraph(
      {
        ...graph,
        nodes: graph.nodes.map((n) => {
          const selectedNodes = graph.edges
            .filter((edge) =>
              selected.some((n) => edge.from === n || edge.to === n)
            )
            .flatMap((edge) => [edge.to, edge.from]);

          const isSelected =
            selected.length === 0 || selectedNodes.some((s) => s === n.id);

          return {
            ...n,
            font: {
              ...n.font,
              color: isSelected ? "white" : "rgba(255,255,255, 0.9)",
            },
            color: {
              ...n.color,
              opacity: 0.3,
              border: isSelected ? n.color?.border : "rgba(0,0,0,0.2)",
              background: isSelected
                ? n.color?.background
                : "rgba(30,30,30,0.15)",
            },
          };
        }),
        edges: graph.edges.map((e) => {
          const isSelected =
            selected.length === 0 ||
            selected.some((n) => e.from === n || e.to === n);
          return {
            ...e,
            width: selected.length > 0 && isSelected ? 2.5 : 0.6,
            color: {
              opacity: isSelected ? 1 : 0.3,
            },
            arrows: {
              ...e.arrows,
            },
          };
        }),
      },

      () => {
        network.fit();
      }
    );
  };
  const events = {
    dragStart: (event) => {},
    dragEnd: (event) => {
      console.log("dragged");
    },
    selectNode: (event) => {
      refreshSelection(event.nodes);
    },
    deselectNode: (event) => {
      refreshSelection(event.nodes);
    },
  };
  if (!graph) return null
  return (
    <div id="graph" style={{ height: "600px" }}>
      <Graph
      key={uuidv4()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          network = network;
          setTimeout(() => network.fit(), 2000);
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
};
