//Dichiarazione elementi
var pic;
var arraypic;
let backImg = 'backstring';
var cardArray= [];
var quantity = 1;
var container = document.getElementById('showcase');
var data = [];
var exLine = [];
var text =document.getElementById('blocknote');
var par=[];


//selezione files
document.getElementById('myFile').onchange= function(){
  let file= this.files[0];
  arraypic = this.files;

  //Prova anteprima
  /*pic = new Image(10,10);
  pic.src= "WillyPlaylist/"+ file.name ;
  document.getElementById('pic').src= pic.src;*/

  for (let i=0 ; i< arraypic.length ; i++){

    let card= {quantity: quantity, front: arraypic[i], back: backImg };
    cardArray.push(card);

    //creo le Carte da visualizzare
    let cardFrontImg= new Image(10,10);
    cardFrontImg.src="WillyPlaylist/"+ arraypic[i].name;

    //visualizzo le carte selezionate
    var nLine= document.createElement('div');
    nLine.innerHTML = "<img width='100' src='"+ cardFrontImg.src +"'>";
    container.appendChild(nLine);


    //compilazione dati excell
    exLine = [card.quantity,card.front,card.back];
    data.push(exLine);

    let row= "1x "+card.front.name;
    par.push(row);

  }

    for(let j=0; j<par.length;j++){
    const para = document.createElement("p");
    const node = document.createTextNode(par[j].substring(0,par[j].length-4));
    para.appendChild(node);
    text.appendChild(para);

    }

}
  //download excell
  document.getElementById("demo").onclick = () => {
  // (C2) CREATE NEW EXCEL "FILE"
  var workbook = XLSX.utils.book_new(),
      worksheet = XLSX.utils.aoa_to_sheet(data);
  workbook.SheetNames.push("First");
  workbook.Sheets["First"] = worksheet;
  // (C3) "FORCE DOWNLOAD" XLSX FILE
  XLSX.writeFile(workbook, "playlist.xlsx");
};
function TassoSuca(){
  console.log("tasso succhia");
  text.innerHTML="tasso buono";
}
