//This file is generated by the AxiomREPL. DO NOT DIRECTLY EDIT THIS FILE!
//To make changes, go to https://repl.axiom.xyz/ and export a new circuit.
//
//                 _                 _____  ______ _____  _
//     /\         (_)               |  __ \|  ____|  __ \| |
//    /  \   __  ___  ___  _ __ ___ | |__) | |__  | |__) | |
//   / /\ \  \ \/ / |/ _ \| '_ ` _ \|  _  /|  __| |  ___/| |
//  / ____ \  >  <| | (_) | | | | | | | \ \| |____| |    | |____
// /_/    \_\/_/\_\_|\___/|_| |_| |_|_|  \_\______|_|    |______|
//
//

import {
  Halo2Lib,
  AxiomData,
  CircuitValue,
  CircuitValue256,
} from "@axiom-crypto/core/halo2-js";
const defaultInputs = {
  user: "0x4badA11eaC257807F8A5Bf2Ae5B0A1e9C90Ad9F2",
  endBlock: 10068895,
  blockInterval: 1,
};
type CircuitInputType = typeof defaultInputs;
export interface CircuitInputs extends CircuitInputType {}
export interface CircuitValueInputs {
  user: CircuitValue;
  endBlock: CircuitValue;
  blockInterval: CircuitValue;
}
const circuitFn = async (
  halo2Lib: Halo2Lib,
  axiomData: AxiomData,
  { user, endBlock, blockInterval }: CircuitValueInputs
) => {
  const { constant, add, sub, mul, or, div } = halo2Lib;
  const { getAccount, addToCallback } = axiomData;
  let total = constant(0);
  const periods = 25;
  for (let i = 0; i < periods; i++) {
    const targetBlock = sub(endBlock, mul(constant(i), blockInterval));
    const bal = getAccount(targetBlock, user)
      .balance()
      .toCircuitValue();
    total = add(total, bal);
  }
  const avg = div(total, constant(periods));
  addToCallback(avg);
  addToCallback(user);
  addToCallback(endBlock);
};
const config = {
  k: 13,
  numAdvice: 4,
  numLookupAdvice: 1,
  numInstance: 1,
  numLookupBits: 12,
  numVirtualInstance: 2,
};
const vk = [
  2,
  13,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  22,
  53,
  175,
  191,
  189,
  44,
  47,
  125,
  102,
  223,
  68,
  183,
  53,
  24,
  221,
  245,
  11,
  40,
  210,
  84,
  147,
  34,
  241,
  111,
  251,
  44,
  176,
  97,
  40,
  23,
  111,
  5,
  236,
  172,
  54,
  30,
  205,
  68,
  139,
  37,
  34,
  255,
  110,
  222,
  63,
  213,
  167,
  105,
  46,
  125,
  148,
  2,
  105,
  228,
  6,
  175,
  114,
  9,
  31,
  238,
  182,
  133,
  168,
  45,
  111,
  112,
  105,
  143,
  90,
  10,
  7,
  41,
  147,
  96,
  141,
  76,
  200,
  115,
  9,
  228,
  13,
  159,
  229,
  117,
  145,
  4,
  17,
  242,
  242,
  229,
  176,
  40,
  54,
  20,
  9,
  46,
  142,
  59,
  94,
  86,
  153,
  25,
  125,
  148,
  48,
  39,
  224,
  223,
  232,
  210,
  57,
  156,
  223,
  142,
  157,
  182,
  49,
  12,
  198,
  105,
  250,
  208,
  118,
  3,
  25,
  240,
  63,
  24,
  116,
  130,
  0,
  102,
  253,
  19,
  51,
  10,
  62,
  243,
  12,
  249,
  144,
  142,
  184,
  228,
  76,
  151,
  67,
  102,
  43,
  58,
  219,
  10,
  143,
  130,
  150,
  201,
  130,
  237,
  216,
  9,
  142,
  11,
  102,
  118,
  76,
  179,
  150,
  153,
  95,
  137,
  102,
  79,
  31,
  115,
  79,
  209,
  11,
  68,
  133,
  188,
  1,
  127,
  14,
  197,
  11,
  65,
  144,
  221,
  242,
  80,
  21,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  81,
  255,
  238,
  19,
  49,
  103,
  237,
  84,
  36,
  165,
  98,
  109,
  137,
  249,
  23,
  204,
  70,
  90,
  13,
  168,
  72,
  137,
  213,
  27,
  74,
  154,
  27,
  177,
  186,
  127,
  232,
  21,
  10,
  199,
  41,
  62,
  204,
  176,
  151,
  104,
  236,
  36,
  70,
  31,
  183,
  162,
  103,
  246,
  71,
  225,
  0,
  80,
  112,
  99,
  198,
  110,
  247,
  144,
  177,
  195,
  79,
  38,
  149,
  39,
  78,
  75,
  78,
  226,
  183,
  191,
  184,
  192,
  10,
  192,
  166,
  222,
  100,
  58,
  130,
  241,
  225,
  149,
  233,
  255,
  85,
  159,
  245,
  247,
  13,
  91,
  127,
  136,
  15,
  203,
  153,
  21,
  161,
  214,
  243,
  118,
  20,
  249,
  64,
  103,
  118,
  162,
  61,
  63,
  237,
  189,
  211,
  135,
  172,
  114,
  147,
  167,
  235,
  215,
  15,
  82,
  59,
  141,
  42,
  35,
  198,
  166,
  190,
  38,
  129,
  32,
  221,
  160,
  2,
  15,
  131,
  249,
  95,
  54,
  190,
  51,
  37,
  210,
  75,
  10,
  123,
  164,
  170,
  220,
  46,
  2,
  32,
  0,
  126,
  162,
  161,
  23,
  118,
  254,
  8,
  8,
  145,
  202,
  133,
  199,
  119,
  206,
  57,
  43,
  71,
  250,
  177,
  202,
  247,
  247,
  49,
  208,
  24,
  55,
  134,
  206,
  167,
  14,
  195,
  5,
  67,
  75,
  229,
  119,
  93,
  216,
  75,
  48,
  129,
  127,
  109,
  132,
  109,
  219,
  168,
  23,
  159,
  8,
  162,
  147,
  15,
  247,
  240,
  86,
  108,
  80,
  248,
  240,
  65,
  159,
  237,
  247,
  215,
  190,
  191,
  70,
  240,
  218,
  95,
  15,
  139,
  84,
  196,
  177,
  252,
  158,
  196,
  233,
  173,
  21,
  59,
  139,
  120,
  126,
  241,
  79,
  176,
  156,
  21,
  225,
  98,
  163,
  218,
  200,
  210,
  106,
  88,
  71,
  32,
  119,
  134,
  30,
  248,
  17,
  160,
  55,
  121,
  168,
  124,
  85,
  5,
  232,
  156,
  11,
  224,
  89,
  116,
  78,
  181,
  45,
  120,
  198,
  223,
  203,
  156,
  189,
  160,
  140,
  117,
  105,
  10,
  53,
  212,
  37,
  140,
  202,
  224,
  95,
  204,
  114,
  5,
  234,
  227,
  19,
  84,
  3,
  218,
  83,
  80,
  10,
  207,
  66,
  72,
  41,
  104,
  80,
  210,
  173,
  6,
  147,
  3,
  3,
  204,
  9,
  218,
  43,
  209,
  112,
  123,
  234,
  82,
  219,
  59,
  14,
  236,
  78,
  160,
  2,
  99,
  233,
  155,
  155,
  127,
  180,
  97,
  222,
  107,
  58,
  218,
  50,
  227,
  91,
  221,
  188,
  130,
  79,
  79,
  23,
  58,
  188,
  3,
  159,
  197,
  140,
  73,
  96,
  68,
  126,
  163,
  248,
  67,
  56,
  91,
  17,
  85,
  253,
  80,
  129,
  98,
  101,
  16,
  248,
  150,
  80,
  113,
  91,
  189,
  53,
  31,
  45,
  89,
  38,
  169,
  251,
  16,
  18,
  201,
  72,
  178,
  42,
  126,
  64,
  81,
  128,
  122,
  134,
  173,
  245,
  50,
  119,
  74,
  79,
  202,
  143,
  15,
  253,
  178,
  191,
  175,
  97,
  130,
  22,
  73,
  188,
  20,
  130,
  241,
  150,
  32,
  144,
  197,
  9,
  192,
  19,
  5,
  21,
  4,
  17,
  207,
  63,
  35,
  217,
  168,
  34,
  31,
  217,
  50,
  19,
  84,
  164,
  206,
  51,
  114,
  15,
];
export const circuit = Object.freeze({
  circuit: circuitFn,
  config,
  defaultInputs,
  vk,
});
