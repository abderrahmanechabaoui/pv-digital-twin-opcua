// Curseur "Température (°C)" -> écriture OPC UA dans KEPServerEX
const value = parseFloat(msg.payload);
if (Number.isNaN(value) || value < -20 || value > 85) {
    node.warn("Température hors plage [-20 ; 85] °C : écriture ignorée");
    return null;
}
msg.payload = { value: value, datatype: "Float" };
msg.topic = "ns=2;s=simulation_PV.jumeau_matlab.Temperature";
return msg;
