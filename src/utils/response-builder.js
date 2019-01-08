function build(success = true, data = {}, meta = {}) {
  // if (!meta.code) {
  //   if (success) {
  //     meta.code = commonCode.successfully.code
  //   }
  // }

  return {
    meta: {
      success,
      serverCode: meta.code ? parseInt(meta.code) : undefined,
      message: meta.message
    },
    data
  }
}

export default {
  build
}
