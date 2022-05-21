import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "next/link";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />

      <div className="markdown" key={new Date().getTime()}>
        The technology known as the blockchain was first revealed by Satoshi
        Nakamoto in his paper “Bitcoin: A Peer-to-Peer Electronic Cash System”
        (https:// bitcoin.org/bitcoin.pdf), which laid out the mathematical
        foundation for the bitcoin cryptocurrency. Although this was a
        groundbreaking paper, it was never actually submitted to a traditional
        peer-reviewed journal, and the author’s true identity is unknown.
        Blockchain technology is not only at the foundation of all
        crytocurrencies, but it has found wide application in the more
        traditional financial industry. It also opened the door to new
        applications such as smart contracts. It’s a Matter of Trust The problem
        that Nakamoto solved with the blockchain was that of establishing trust
        in a distributed system. More specifically, the problem of creating a
        distributed storage of timestamped documents where no party can tamper
        with the content of the data or the timestamps without detection. Note
        that this problem is orthogonal to the problems of authentication,
        integrity, and nonrepudiation, which are solved by digital signatures.
        If a party creates a digital signature for a document, it establishes
        only a verifiable link between the party and the document. The existence
        of a valid digital signature proves that the party indeed intended to
        sign the document and that the document hasn’t been altered. Yet the
        digital signature guarantees nothing about the time when the document
        was signed: the timestamp requires trust in the party that signed it. In
        the case of financial transactions and other forms of legal contracts,
        time is of the essence, and the order of those financial transactions
        needs to be independently certified to be auditable.Consider the case of
        house sales. The owner can be defined as the party to whom the house was
        last sold to, but ownership can only be verified from the full paper
        trail of all transactions related to the house, a paper trail that’s
        usually kept and verified by title companies. Note this system doesn’t
        completely prevent fraudulent transactions (such as a person selling a
        house that he or she doesn’t own or selling the same property to more
        than one party), but fraudulent activities eventually get detected, and
        true ownership is established. The same ownership verification problem
        arises in financial transactions—for sure, in the sale of
        cryptocurrency, but also in the sale of any other traditional financial
        instrument. The problem is normally solved by recording all transactions
        in a single trusted centralized ledger, but a ledger isn’t always a
        practical solution because it doesn’t scale to large numbers of frequent
        transactions and because it requires all parties to trust the ledger’s
        maintainer. In the same way you need to trust your bank with your money
        (and bank employees stealing customer funds is not unheard of). To
        address this, the blockchain provides a distributed trust mechanism:
        multiple parties keep a record of transactions, and every party can
        verify that the order and timestamps of the transactions haven’t been
        tampered with. A unit of bitcoin is nothing other than a number, but
        only some numbers are valid bitcoins. These numbers are solutions of a
        well-defined equation, and whoever finds a new solution owns it (this
        process is called mining). Once a bitcoin is discovered, it can be
        traded, with transactions stored in a ledger. Transactions are digitally
        signed with the credentials of the seller to avoid nonrepudiation. There
        is no centralized ledger because users wouldn’t trust one and because
        there are too many transactions to store them all in one place. Hence
        bitcoin and other cryptocurrencies provide a distributed ledger in which
        every computer involved in the transaction of a specific coin (or
        fraction of a coin) keeps a copy of the history of that coin’s
        transactions. The blockchain technology makes sure that no party storing
        this history can tamper with it without being detected.
        <Link
        passHref
          href={"https://cse.sc.edu/~mgv/csce190f19/diPierro_mcs2017050092.pdf"}
        >
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </Link>
      </div>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
