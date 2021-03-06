module.exports = {
    coverageDirectory:"coverage",
    testEnvironment: "node",
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: [
        "<rootDir>/src"
    ],
    collectCoverageFrom: ['<rootDir>/src/***/*.ts'],
    moduleFileExtensions: ['js', 'ts'],
    // modulePathIgnorePatterns: ['<rootDir>/src/presentation/']
}