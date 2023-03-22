import { Component, EventEmitter, Output } from '@angular/core';
import { CompteService } from '../../../services/compte.service';

@Component({
  selector: 'ngx-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent {
  compte_nom: any;
  selectedCompte: any;
  newCompteEmail: string;
  newCompteNom: any; 
  newComptePassword: any;
  newComptePrenom: any;
  newCompteTel: any;
  expanded = false;
  societe_nom: any;
  compteVisibility: { [key: string]: boolean } = {};
  dep_nom: any;
  
  constructor(private compteService: CompteService){}
  @Output() onClose = new EventEmitter<void>();
  closeAddPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getComptes();
    this.getSocietes();
    this.getDepartements();
    const checkboxes = document.getElementById('checkboxes');
    checkboxes.style.display = 'none';
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
  async addCompte() {
    console.log(this.newCompteEmail);
    let compSocietes: any[]=[];
    this.societe_nom.forEach(element => {
      if(element.checked == true){
        compSocietes.push(element);
      }
    });
    console.log("list comp soci "+compSocietes);
    let compDepartements: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
       compDepartements.push(element);
      }
    });
    console.log("list comp dep"+compDepartements);
    
    let compteData = { Nom: this.newCompteNom, Prenom: this.newComptePrenom, telephone: this.newCompteTel, email: this.newCompteEmail , password: this.newComptePassword, societes: compSocietes, departements:compDepartements};
    await this.compteService.addCompte(compteData).then(res => {
      console.log("new comp "+res.data);
        this.getSocietes();
        this.getComptes();
        this.getDepartements()
        this.newCompteNom = '';
        this.newComptePrenom = '';
        this.newCompteTel = '';
        this.newCompteEmail = '';
        this.newComptePassword = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
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
