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
    preset: '@shelf/jest-mongodb',
    // modulePathIgnorePatterns: ['<rootDir>/src/presentation/']
}