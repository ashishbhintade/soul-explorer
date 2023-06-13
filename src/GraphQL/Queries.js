import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  {
    ethereum(network: celo_alfajores) {
      smartContractCalls(
        options: { desc: "block.timestamp.time", limit: 50, offset: 0 }
        smartContractAddress: {
          is: "0xf163686d50C800C49ED58836d3a4D1fBA057CeE6"
        }
        smartContractMethod: { is: "mint" }
      ) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        transaction {
          hash
        }
        arguments {
          argument
          value
        }
        smartContractMethod {
          name
        }
      }
    }
  }
`;
