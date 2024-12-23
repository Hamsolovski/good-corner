import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: "http://localhost:3000",
    documents: "./src/graphql/*.{ts, tsx, graphql}",
    generates: {
        "./src/graphql/__generated__/": {
            preset: "client",
            presetConfig: {
                gqlTagName: 'gql',
            }
        },
        "./src/__generated__/types.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
            config: {
                withHooks: true,
            }
        }
    },

};

export default config;