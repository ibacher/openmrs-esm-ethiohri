import { openmrsFetch } from "@openmrs/esm-framework";

const AH_BASE_WS_API_URL =
  "/module/addresshierarchy/ajax/getPossibleAddressHierarchyEntriesWithParents.form";
const CONF_BASE_WS_API_URL = "/ws/rest/v1/";

export function performAdressHirarchiSearch(addressField, query) {
  return openmrsFetch(
    `${AH_BASE_WS_API_URL}?addressField=${addressField}&limit=20&searchString=${query}`,
    {
      method: "GET",
    }
  );
}
export function performAdressHirarchiWithParentSearch(
  addressField,
  parentid,
  query
) {
  return openmrsFetch(
    `${AH_BASE_WS_API_URL}?addressField=${addressField}&limit=20&searchString=${query}&parentUuid=${parentid}`,
    {
      method: "GET",
    }
  );
}
export function getConfig(query) {
  return openmrsFetch(`${CONF_BASE_WS_API_URL}systemsetting?q=${query}`, {
    method: "GET",
  });
}
