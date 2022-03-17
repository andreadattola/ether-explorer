export function createAsyncActionType(section = '', type = '') {
    return {
      _REQUEST: `@@${section.toLowerCase()}/${type.toUpperCase()}_REQUEST`,
      _SUCCESS: `@@${section.toLowerCase()}/${type.toUpperCase()}_SUCCESS`,
      _ERROR: `@@${section.toLowerCase()}/${type.toUpperCase()}_ERROR`,
    }
  }
  