document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/renderers/UniqueValueRenderer"
  ], function (Map, MapView, FeatureLayer, SimpleFillSymbol, SimpleRenderer, UniqueValueRenderer) {
    const myMap = new Map({
      basemap: "streets-navigation-vector",
    });

    const view = new MapView({
      container: "viewDiv",
      map: myMap,
      center: [-100, 40],
      zoom: 4,
    });

    const featureLayer = new FeatureLayer({
      url: "https://services.gis.ca.gov/arcgis/rest/services/Boundaries/CA_Counties/FeatureServer/0",
      popupTemplate: {
        title: "CA countries",
        content: "OBJECTID: {OBJECTID}<br>Population : {Population}<br>AREA_ID: {AREA_ID}",
      },
    });

    view.whenLayerView(featureLayer).then((layerView) => {
      const filterInput = document.getElementById("filterInput");
      const fieldSelect = document.getElementById("fieldSelect");
      const secondFilterInput = document.getElementById("secondFilterInput");
      const secondFieldSelect = document.getElementById("secondFieldSelect");

      layerView.layer.fields.forEach((field) => {
        let option = document.createElement("option");
        option.value = option.id = field.name;
        option.text = field.alias;
        option.fieldType = field.type;
        fieldSelect.append(option);

        let secondOption = document.createElement("option");
        secondOption.value = secondOption.id = field.name;
        secondOption.text = field.alias;
        secondOption.fieldType = field.type;
        secondFieldSelect.append(secondOption);
      });

      filterInput.addEventListener("input", updateFilters);
      secondFilterInput.addEventListener("input", updateFilters);
      fieldSelect.addEventListener("change", updateFilters);
      secondFieldSelect.addEventListener("change", updateFilters);

      function updateFilters() {
        const inputValue = filterInput.value.trim();
        const secondInputValue = secondFilterInput.value.trim();
        const field = fieldSelect.value;
        const secondField = secondFieldSelect.value;

        const optionType = document.getElementById(field).fieldType;
        const secondOptionType = document.getElementById(secondField).fieldType;

        let definitionExpression = "";

        if (inputValue !== "") {
          definitionExpression += buildExpression(field, inputValue, optionType);
        }
        if (secondInputValue !== "") {
          if (definitionExpression !== "") {
            definitionExpression += " AND ";
          }
          definitionExpression += buildExpression(secondField, secondInputValue, secondOptionType);
        }
        featureLayer.definitionExpression = definitionExpression !== "" ? definitionExpression : "1=1";

        // Create a unique value renderer to highlight the selected features
        const uniqueValueRenderer = new UniqueValueRenderer({
          field: field,
          defaultSymbol: new SimpleFillSymbol(), 
          uniqueValueInfos: [{
            value: inputValue, 
            symbol: new SimpleFillSymbol({ 
              color: "blue", 
              outline: { color: "black", width: 1 } 
            })
          }]
        });

        featureLayer.renderer = uniqueValueRenderer;
        featureLayer.renderingMode = "auto";
      }

      function buildExpression(field, value, type) {
        if (type === "integer" || type === "double") {
          return `${field} = ${value}`;
        } else if (type === "string") {
          return `UPPER(${field}) LIKE '%${value.toUpperCase()}%'`;
        } else {
          console.warn("Unsupported field type:", type);
          return "";
        }
      }
    });

    myMap.add(featureLayer);
  });
});
