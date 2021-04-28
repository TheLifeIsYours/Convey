module.exports = {
  verbose: true,
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
    "\\.(css|less|scss)$":  "identity-obj-proxy"
  }
}