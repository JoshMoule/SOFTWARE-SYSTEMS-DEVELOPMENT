/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var socket = new WebSocket("ws://localhost:8080/BiddingApp/actions");
socket.onmessage = onMessage;

function init() {
    
}

function onMessage(event) {
    var message = JSON.parse(event.data);
    if (message.action === "add") {
        printBidElement(message);
        document.getElementById("error").innerHTML = "";
    }else if(message.action === "highest"){
        document.getElementById("highestBidValue").innerHTML = message.value;
    }else if(message.action === "error"){
        document.getElementById("error").innerHTML = message.value;
    }
}

function formSubmit() {
    var form = document.getElementById("addBidForm");
    var value = form.elements["bidValue"].value;
    
    document.getElementById("addBidForm").reset();
    
    addBid(value);
}

function printBidElement(bid) {
    var bidsContainer = document.getElementById("bids");
    
    var bidDiv = document.createElement("div");
    bidDiv.setAttribute("class", "bid");
    bidsContainer.appendChild(bidDiv);

    var bidValue = document.createElement("span");
    bidValue.setAttribute("class", "bidValue");
    bidValue.innerHTML = bid.value;
    bidsContainer.appendChild(bidValue);
}

function addBid(value) {
    var bid = {
        action: "add",
        value: value
    };
    socket.send(JSON.stringify(bid));
}