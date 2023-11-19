// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {JeexAxiomV2Client} from "../src/JeexAxiomV2Client.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        address axiomV2QueryAddress = vm.envAddress("AXIOM_V2_QUERY_ADDRESS");
        uint64 callbackSourceChainId = uint64(vm.envUint("CALLBACK_SOURCE_CHAINID"));
        JeexAxiomV2Client jeexAxiomClient = new JeexAxiomV2Client(axiomV2QueryAddress, callbackSourceChainId);
    }
}
