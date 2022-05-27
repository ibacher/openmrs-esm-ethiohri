import React, { useEffect, useState } from "react";
import { Button, TextInput, ComboBox } from "carbon-components-react";
import {
  getConfig,
  performAdressHirarchiWithParentSearch,
} from "../../api/api";

export default function addresshirarchi() {
  var nulldata = [];
  const [comboboxlist, setcomboboxlist] = useState(nulldata);
  const [selected, setselected] = useState();
  const [addressconfig, setaddressconfig] = useState(nulldata);

  useEffect(() => {
    getConfig("layout.address.format&v=custom:(value)")
      .then((value) => {
        const xmlstring = value.data.results[0].value;
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlstring, "text/xml");
        const filteredarray = xml
          .getElementsByTagName("nameMappings")[0]
          .textContent.split("     ");
        setaddressconfig(
          filteredarray.filter(
            (text) => !text.includes(".") && text.trim().length
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
  function comboboxevent(text, id) {
    if (text == "") {
    } else {
      //remove this one
      setcomboboxlist([]);
      //parse and and add to list
      performAdressHirarchiWithParentSearch(id.replace(" ", ""), selected, text)
        .then((value) => {
          var element = [];
          value.data.forEach((parent1) => {
            element.push({ id: parent1["uuid"], text: parent1["name"] });
          });
          console.log(value);
          setcomboboxlist(element);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <h1>Address</h1>
      <div
        style={{
          width: 300,
        }}
      >
        {addressconfig.map((id) => (
          <ComboBox
            downshiftProps={{
              onStateChange: function noRefCheck() {},
            }}
            id={id + "-combobox"}
            onInputChange={(event) => comboboxevent(event, id)}
            itemToString={(item) => (item ? item.text : "")}
            items={comboboxlist}
            onChange={(e) => {
              setselected(e.selectedItem.id);
            }}
            placeholder={id}
            titleText={id}
          />
        ))}

        <TextInput
          // helperText="Kebele"
          id="Kebele-textbox"
          // invalidText="A valid value is required"
          placeholder="Kebele"
          labelText="Kebele"
        />
        <TextInput
          // helperText="House No"
          id="HouseNo-text"
          // invalidText="A valid value is required"
          labelText="House No"
          placeholder="House No"
        />
      </div>
      <Button>Sumbit</Button>
    </div>
  );
}
