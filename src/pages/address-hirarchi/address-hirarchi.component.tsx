import React, { useEffect, useState } from "react";
import { Button, TextInput, ComboBox } from "carbon-components-react";
import { openmrsFetch } from "@openmrs/esm-framework";
import Autocomplete from "./Autocomplete/Autocomplete.component";
import {
  performAdressHirarchiSearch,
  performAdressHirarchiWithParentSearch,
} from "../../api/api";

export default function addresshirarchi() {
  var nulldata = [];
  const [regioncomboboxlist, setregioncomboboxlist] = useState(nulldata);
  const [weredacomboboxlist, setweredacomboboxlist] = useState(nulldata);
  const [zonecomboboxlist, setzonecomboboxlist] = useState(nulldata);
  const [selectedregion, setselectedregion] = useState();
  const [selectedzone, setselectedzone] = useState();

  let comboboxComponent;
  function regioncomboboxevent(e) {
    if (e == "") {
    } else {
      //remove this one
      setregioncomboboxlist([]);
      //parse and and add to list
      performAdressHirarchiSearch("stateProvince", e)
        .then((value) => {
          var regionelement = [];
          value.data.forEach((parent1) => {
            regionelement.push({ id: parent1["uuid"], text: parent1["name"] });
          });
          setregioncomboboxlist(regionelement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function zonecomboboxevent(e) {
    if (e == "") {
    } else {
      //remove this one
      setzonecomboboxlist([]);
      //parse and and add to list
      performAdressHirarchiWithParentSearch("countyDistrict", selectedregion, e)
        .then((value) => {
          var zoneelement = [];
          var regionelement = [];
          //var weredaelement = [];
          value.data.forEach((parent1) => {
            zoneelement.push({ id: parent1["uuid"], text: parent1["name"] });
            regionelement.push({
              id: parent1["parent"]["uuid"],
              text: parent1["parent"]["name"],
            });
          });
          setzonecomboboxlist(zoneelement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function weredacomboboxevent(e) {
    if (e == "") {
    } else {
      //remove this one
      setweredacomboboxlist([]);
      //parse and and add to list
      performAdressHirarchiWithParentSearch("cityVillage", selectedzone, e)
        .then((value) => {
          var weredaelement = [];
          var regionelement = [];
          var zoneelement = [];
          value.data.forEach((parent1) => {
            weredaelement.push({ id: parent1["uuid"], text: parent1["name"] });
            zoneelement.push({
              id: parent1["parent"]["uuid"],
              text: parent1["parent"]["name"],
            });
            regionelement.push({
              id: parent1["parent"]["parent"]["uuid"],
              text: parent1["parent"]["parent"]["name"],
            });
          });
          setweredacomboboxlist(weredaelement);
          // console.log(zoneelement);
          // console.log(regionelement);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function cascadeworedaCombo(e) {
    performAdressHirarchiWithParentSearch(
      "cityVillage",
      "",
      e.selectedItem.text
    )
      .then((value) => {
        var weredaelement = [];
        var regionelement = [];
        var zoneelement = [];
        value.data.forEach((parent1) => {
          weredaelement.push({ id: parent1["uuid"], text: parent1["name"] });
          zoneelement.push({
            id: parent1["parent"]["uuid"],
            text: parent1["parent"]["name"],
          });
          regionelement.push({
            id: parent1["parent"]["parent"]["uuid"],
            text: parent1["parent"]["parent"]["name"],
          });
        });
        console.log(weredaelement);
        console.log(zoneelement);
        setzonecomboboxlist(zoneelement);
        console.log(regionelement);
        setregioncomboboxlist(regionelement);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Address</h1>
      {/* <TextInput
                // helperText="Region"
                id="test1"
                // invalidText="A valid value is required"
                labelText="Region"
                placeholder="Region"
                style={{width:'30%'}}
            />
            <TextInput
                // helperText="Zone/Sub-City"
                id="test2"
                // invalidText="A valid value is required"
                labelText="Zone/Sub-City"
                placeholder="Zone/Sub-City"
                style={{width:'30%'}}
            />
            <TextInput
                // helperText="Wereda"
                id="test3"
                // invalidText="A valid value is required"
                labelText="Wereda"
                placeholder="Wereda"
                style={{width:'30%'}}
            /> */}
      {/* <Autocomplete parentMethod={someMethod()} filedlabel="Region" suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]} activeSuggestion={""} filteredSuggestions={undefined} /><br/>
            <Autocomplete parentMethod={someMethod()}filedlabel="Zone/Sub-City" suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]} activeSuggestion={""} filteredSuggestions={undefined} /><br/>
            <Autocomplete parentMethod={someMethod()} filedlabel="Wereda" suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]} activeSuggestion={""} filteredSuggestions={undefined} /><br/> */}
      <br />
      <div
        style={{
          width: 300,
        }}
      >
        <ComboBox
          downshiftProps={{
            onStateChange: function noRefCheck() {},
          }}
          id="regin-combobox"
          onInputChange={regioncomboboxevent}
          itemToString={(item) => (item ? item.text : "")}
          items={regioncomboboxlist}
          onChange={(e) => {
            setselectedregion(e.selectedItem.id);
          }}
          placeholder="Region"
          titleText="Region"
        />
        <ComboBox
          downshiftProps={{
            onStateChange: function noRefCheck() {},
          }}
          id="zone-combobox"
          onInputChange={zonecomboboxevent}
          itemToString={(item) => (item ? item.text : "")}
          items={zonecomboboxlist}
          onChange={(e) => {
            setselectedzone(e.selectedItem.id);
          }}
          placeholder="Zone/Sub-City"
          titleText="Zone/Sub-City"
        />
        <ComboBox
          downshiftProps={{
            onStateChange: function noRefCheck() {},
          }}
          id="wereda-combobox"
          onInputChange={weredacomboboxevent}
          itemToString={(item) => (item ? item.text : "")}
          items={weredacomboboxlist}
          onChange={cascadeworedaCombo}
          placeholder="Wereda"
          titleText="Wereda"
        />
        <TextInput
          // helperText="Wereda"
          id="test3"
          // invalidText="A valid value is required"
          placeholder="Kebele"
          labelText="Kebele"
        />
        <TextInput
          // helperText="Wereda"
          id="test3"
          // invalidText="A valid value is required"
          labelText="House No"
          placeholder="House No"
        />
      </div>
      <Button>Sumbit</Button>
    </div>
  );
}
