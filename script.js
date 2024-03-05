var admins = {
    "ED574": "jules92",
    "ed574": "jules92",
    "BH812": "Mineurgab13"
};

// Chargement des cartes sauvegardées dans le localStorage
window.onload = function() {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    cartes.forEach(function(carte) {
        afficherCarte(carte.pseudo);
    });
};

function creerCarte() {
    var codeAdmin = prompt("Entrez le code administrateur :");
    if (codeAdmin !== null) {
        if (admins.hasOwnProperty(codeAdmin)) {
            var pseudo = prompt("Entrez le pseudo de la personne :");
            if (pseudo !== null) {
                afficherCarte(pseudo);
                sauvegarderCarte(pseudo);
            }
        } else {
            alert("Code administrateur incorrect");
        }
    }
}

function afficherCarte(pseudo) {
    var carteDiv = document.createElement('div');
    carteDiv.className = "carte";

    //calculde la largeur en fonction de la largeur du pseudo
    var largeur = Math.max(88, pseudo.length * 10);
    carteDiv.style.width = largeur + "px";
    carteDiv.style.height = "110px";

    var img = document.createElement('img');
    img.src = "https://skins.nationsglory.fr/face/" + pseudo + "/3d/20";
    img.className = "img-icon";
    img.alt = "Photo du joueur";

    var a = document.createElement('a');
    a.innerHTML = "<strong>" + pseudo + "</strong>";

    carteDiv.appendChild(img);
    carteDiv.appendChild(a);

    var supprimerBtn = document.createElement('button');
    supprimerBtn.className = "supprimer delete-button";
    supprimerBtn.innerText = "Supprimer";
    supprimerBtn.onclick = function() {
        var codeAdmin = prompt("Entrez le code administrateur pour supprimer la carte de " + pseudo + " :");
        if (codeAdmin !== null) {
            if (admins.hasOwnProperty(codeAdmin)) {
                var confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette carte ?");
                if (confirmation) {
                    this.parentNode.remove();
                    supprimerCarte(pseudo);
                }
            } else {
                alert("Code administrateur incorrect");
            }
        }
    };

    carteDiv.appendChild(supprimerBtn);

    document.getElementById('cartes').appendChild(carteDiv);
}

function sauvegarderCarte(pseudo) {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    cartes.push({ pseudo: pseudo });
    localStorage.setItem('cartes', JSON.stringify(cartes));
}

function supprimerCarte(pseudo) {
    var cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    var index = cartes.findIndex(function(carte) {
        return carte.pseudo === pseudo;
    });
    if (index !== -1) {
        cartes.splice(index, 1);
        localStorage.setItem('cartes', JSON.stringify(cartes));
    }
}
