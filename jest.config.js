export default {
  extensionsToTreatAsEsm: [".jsx"],
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
