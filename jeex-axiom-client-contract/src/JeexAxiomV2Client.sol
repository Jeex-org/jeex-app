// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AxiomV2Client} from "./AxiomV2Client.sol";
import {ERC721} from "solmate/tokens/ERC721.sol";
import {Owned} from "solmate/auth/Owned.sol";

/// @title  Example AxiomV2Client Contract
/// @notice Example AxiomV2Client contract which emits events upon callback.
contract JeexAxiomV2Client is AxiomV2Client, ERC721, Owned {
    /// @dev NFT supply counter
    uint256 internal supply = 0;

    /// @dev minimum acceptable average ETH amount
    uint256 internal minAvgETHAmount = 1 ether;

    /// @dev Axiom query schema for the app
    bytes32 internal querySchema;

    /// @dev The number of blocks we allow `endBlock` of a circuit fall behind current block
    uint256 internal maxBlocksDelay = 100;

    /// @dev Error returned if the computed average ETH is less than `minAvgETHAmount`.
    error LessThanMinAvgETHAmount();

    /// @dev Error returned if the prove has been computed for another EOA
    error ProofForAnotherEOA();

    /// @dev Error returned if the prove has been computed for block that are too far in the past
    error ProofIsTooFarBehind();

    /// @dev Error returned if the `sourceChainId` does not match.
    error SourceChainIdDoesNotMatch();

    error Unsupported();

    /// @notice Emitted after validation of a callback.
    /// @param  caller The address of the account that initiated the query.
    /// @param  querySchema The schema of the query, defined as `keccak(k . resultLen . vkeyLen . vkey)`
    event ExampleClientAddrAndSchema(address indexed caller, bytes32 indexed querySchema);

    /// @notice Emitted after callback is made.
    /// @param  queryId The unique ID identifying the query.
    /// @param  axiomResults The results of the query.
    /// @param  extraData Additional data passed to the callback.
    event ExampleClientEvent(uint256 indexed queryId, bytes32[] axiomResults, bytes extraData);

    /// @dev The chain ID of the chain whose data the callback is expected to be called from.
    uint64 public callbackSourceChainId;

    /// @notice Construct a new ExampleV2Client contract.
    /// @param  _axiomV2QueryAddress The address of the AxiomV2Query contract.
    /// @param  _callbackSourceChainId The ID of the chain the query reads from.
    constructor(address _axiomV2QueryAddress, uint64 _callbackSourceChainId)
        AxiomV2Client(_axiomV2QueryAddress)
        ERC721("JEEX", "JEEX")
        Owned(msg.sender)
    {
        callbackSourceChainId = _callbackSourceChainId;
    }

    function setMaxBlocksDelay(uint256 _maxBlocksDelay) public onlyOwner {
        assert(maxBlocksDelay < block.number);
        maxBlocksDelay = _maxBlocksDelay;
    }

    function getMaxBlocksDelay() public view returns (uint256) {
        return maxBlocksDelay;
    }

    function setMinAvgETHAmount(uint256 _minAvgETHAmount) public onlyOwner {
        minAvgETHAmount = _minAvgETHAmount;
    }

    function getMinAvgETHAmount() public view returns (uint256) {
        return minAvgETHAmount;
    }

    function setQuerySchema(bytes32 _querySchema) public onlyOwner {
        querySchema = _querySchema;
    }

    function getQuerySchema() public view returns (bytes32) {
        return querySchema;
    }

    /// @inheritdoc AxiomV2Client
    function _validateAxiomV2Call(
        AxiomCallbackType callbackType,
        uint64 sourceChainId,
        address caller,
        bytes32 _querySchema,
        uint256 queryId,
        bytes calldata extraData
    ) internal override {
        if (sourceChainId != callbackSourceChainId) {
            revert SourceChainIdDoesNotMatch();
        }
        // We do not validate the caller or querySchema for example purposes,
        // but a typical application will want to validate that the querySchema matches
        // their application.
        emit ExampleClientAddrAndSchema(caller, _querySchema);
        supply = supply + 1;
        _safeMint(caller, supply);
    }

    /// @inheritdoc AxiomV2Client
    function _axiomV2Callback(
        uint64 sourceChainId,
        address caller,
        bytes32 _querySchema,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata extraData
    ) internal override {
        uint256 computedAvgETHAmount = uint256(axiomResults[0]);
        if (computedAvgETHAmount < minAvgETHAmount) {
            revert LessThanMinAvgETHAmount();
        }
        address holderAddress = address(uint160(uint256(axiomResults[1])));
        if (holderAddress != caller) {
            revert ProofForAnotherEOA();
        }
        uint256 endBlock = uint256(axiomResults[2]);
        if (endBlock < block.number - maxBlocksDelay) {
            revert ProofIsTooFarBehind();
        }
        emit ExampleClientEvent(queryId, axiomResults, extraData);
    }

    function tokenURI(uint256) public view virtual override returns (string memory) {
        string memory baseURI = "https://jeex.com/nft";
        return baseURI;
    }

    function transferFrom(address from, address to, uint256 id) public virtual override {
        revert Unsupported();
    }
}
