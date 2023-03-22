import { Component } from '@angular/core';
import { CompteService } from '../../services/compte.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCompteComponent } from "./add-compte/add-compte.component";
@Component({
  selector: 'ngx-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent{
  p: number = 1;
  compte_nom: any;
  selectedCompte: any;
  newCompteEmail: string;
  editedCompteEmail: string;
  newCompteNom: any; 
  newComptePassword: any;
  newComptePrenom: any;
  newCompteTel: any;
  expanded = false;
  societe_nom: any;
  compteVisibility: { [key: string]: boolean } = {};
  dep_nom: any;
  editedComptePassword: any;
  editedCompteNom: any;
  editedComptePrenom: any;
  editedCompteTel: any;
  constructor(private compteService: CompteService, public dialog: MatDialog){}
  openAddPopup() {
    this.dialog.open(AddCompteComponent); 
  }
  ngOnInit() {
    this.getComptes();
    this.getSocietes();
    this.getDepartements();
    const checkboxes = document.getElementById('checkboxes');
    checkboxes.style.display = 'none';
  }
  selectCompte(event, comp) {
    event.preventDefault();
    this.selectedCompte = comp;
    this.editedCompteEmail = comp.attributes.email;
  }
  async getComptes() {
    await this.compteService.getComptes().then(res => {
        this.compte_nom = res.data;
        this.compte_nom.forEach(comp => { 
          this.compteVisibility[comp.id] = false; // initialize visibility state for each row
          comp.societesList = comp.attributes.societes.data;
          console.log(JSON.stringify(comp.societesList));
        }); 
        this.compte_nom.forEach(comp => { 
          this.compteVisibility[comp.id] = false; // initialize visibility state for each row
          comp.departementsList = comp.attributes.departements.data;
          console.log(JSON.stringify(comp.departementsList));
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  async editCompte() {
    console.log(this.editedCompteEmail ,this.editedComptePassword,this.editedCompteNom, this.editedComptePrenom, this.editedCompteTel);
    let compDepartements: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        compDepartements.push(element);
      }
    });
    console.log("list dep comp "+compDepartements);
    let compSocietes: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        compSocietes.push(element);
      }
    });
    console.log("list dep comp "+compSocietes);

    let compteData = { email: this.editedCompteEmail , password: this.editedComptePassword, Nom: this.editedCompteNom, Prenom: this.editedComptePrenom ,telephone: this.editedCompteTel , societes: compSocietes, departements:compDepartements};
    await this.compteService.editCompte(this.selectedCompte.id, compteData).then(res => {
        console.log(res.data);
        this.getSocietes();
        this.getComptes();
        this.getDepartements()
    }).catch(err => {
        console.log(err);
    }); 
  }
  async deleteCompte() {
    await this.compteService.deleteCompte(this.selectedCompte.id).then(res => {
        console.log(res.data);
        this.getSocietes();
        this.getComptes();
        this.getDepartements()
        this.selectedCompte = null;
    }).catch(err => {
        console.log(err);
    });
  }
  async getSocietes() {
    await this.compteService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        this.compteVisibility[soci.id] = false; // initialize visibility state for each row
        soci.societesList = soci.attributes.societes.data;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async getDepartements() {
    await this.compteService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        this.compteVisibility[dep.id] = false; // initialize visibility state for each row
        dep.departementsList = dep.attributes.departements.data;
        dep.checked = false;
        console.log(JSON.stringify(dep.departementsList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectDepartement(departement){
    departement.checked = !departement.checked;
  }
  async selectSociety(societe){
    societe.checked = !societe.checked;
  } 
}
