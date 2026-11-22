// Curseur "Irradiance (W/m²)" -> écriture OPC UA dans KEPServerEX
// Le curseur web envoie une chaîne : conversion en Float, sinon le serveur rejette (Type Mismatch).
const value = parseFloat(msg.payload);
if (Number.isNaN(value) || value < 0 || value > 1200) {
    node.warn("Irradiance hors plage [0 ; 1200] W/m² : écriture ignorée");
    return null;
}
msg.payload = { value: value, datatype: "Float" };
msg.topic = "ns=2;s=simulation_PV.jumeau_matlab.Irradiance";
return msg;
