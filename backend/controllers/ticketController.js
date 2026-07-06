const path = require("path");


const mostrarTicket = (req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/ticket.html"));

}

const mostrarCssTicket = (req,res)=>{

    res.sendFile(path.join(__dirname,"../../frontend/css/ticket.css"));


}

// const mostrarJsTicket = (req,res)=>{

//     // res.sendFile(path.join(__dirname,"../../frontend/js/"))
// }


module.exports = {
    mostrarTicket,
    mostrarCssTicket
}