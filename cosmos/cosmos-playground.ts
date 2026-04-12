/**
 * React Cosmos fixture controls: editable values appear in the playground UI
 * (fixture state / inputs panel) and persist while you interact with the preview.
 * Each fixture under `cosmos/` uses namespaced keys (e.g. `buttonLabel`, `accordionSection1Title`).
 *
 * @see https://reactcosmos.org/docs/user-interface#fixture-inputs
 */
export {
  useFixtureInput,
  useFixtureSelect,
  useFixtureState,
  useValue,
} from "react-cosmos/client"
