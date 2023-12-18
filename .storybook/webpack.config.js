module.exports = function ({ config }) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
  }

  return config
}
