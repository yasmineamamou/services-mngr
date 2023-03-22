import { Component, EventEmitter, Output } from '@angular/core';
import { SocieteComponent } from "../societe.component";
import { SocieteService } from "../../../services/societe.service";
 
@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  p: number = 1;
  societe_nom: any;
  dep_nom: any;
  selectedSociete: any;
  newSocieteName: string;
  editedSocieteName: string;
  societeVisibility: { [key: string]: boolean } = {};
  newSocieteDescription: any; 
  expanded = false;
  type_nom: any;
  compte_email: any;
  compte_nom: any;
  editedSocieteDescription: string;
  constructor(private societeService: SocieteService) { }

  @Output() onClose = new EventEmitter<void>();

  closePopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getTypes();
    this.getSocietes();
    this.getDepartements();
    this.getComptes();
    const checkboxes = document.getElementById('checkboxes');
    checkboxes.style.display = 'none';

  }
  selectSociete(event, soci) {
    event.preventDefault();
    this.selectedSociete = soci;
    this.editedSocieteName = soci.attributes.Nom;
    this.editedSocieteDescription = soci.attributes.Description;
  }
  async getSocietes() {
    await this.societeService.getSocietes().then(res => {
        this.societe_nom = res.data;
        this.societe_nom.forEach(soci => {
          this.societeVisibility[soci.id] = false; // initialize visibility state for each row
          soci.departementsList = soci.attributes.departements.data;
          console.log( JSON.stringify(soci.departementsList));
        }); 
        this.societe_nom.forEach(soci => {
          this.societeVisibility[soci.id] = false; // initialize visibility state for each row
          soci.typesList = soci.attributes.types.data;
          console.log( JSON.stringify(soci.typesList));
        }); 
        this.societe_nom.forEach(soci => {
          this.societeVisibility[soci.id] = false; // initialize visibility state for each row
          soci.comptesList = soci.attributes.compte.data;
          console.log( JSON.stringify(soci.comptesList));
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  async addSociete() {
    console.log(this.newSocieteName);
    let sociDepartement: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        sociDepartement.push(element);
      }
    });
    console.log("list soc dep"+sociDepartement);
    let sociType!: any;
    this.type_nom.forEach(element => {
      if(element.checked == true){
        sociType=element;
      }
    });
    console.log("list soc typ"+sociType);

    let societeData = { Nom: this.newSocieteName , Description:this.newSocieteDescription, departements: sociDepartement, type: sociType};
    await this.societeService.addSociete(societeData).then(res => {
        console.log("new soc "+res.data);
        this.getDepartements();
        this.getSocietes();
        this.getTypes();
        this.getComptes();
        this.newSocieteName = '';
        this.newSocieteDescription = '';
    }).catch(err => {
        console.log(err);
    });
  }
  async editSociete() {
    console.log(this.editedSocieteName, this.editedSocieteDescription);
    let sociDepartements: any[]=[];
    this.dep_nom.forEach(element => {
      if(element.checked == true){
        sociDepartements.push(element);
      }
    });
    console.log("list dep soci "+sociDepartements);
    let sociType!: any;
    this.type_nom.forEach(element => {
      if(element.checked == true){
        sociType=element;
      }
    });
    let societeData = { Nom: this.editedSocieteName, Description: this.editedSocieteDescription, departements: sociDepartements, type: sociType};
    await this.societeService.editSociete(this.selectedSociete.id, societeData).then(res => {
      console.log("new soci "+res.data);
        this.getSocietes();
        this.getDepartements();
        this.getTypes();
        this.getComptes();
    }).catch(err => {
        console.log(err);
    }); 
   
  }
  async deleteSociete() {
    await this.societeService.deleteSociete(this.selectedSociete.id).then(res => {
        console.log(res.data);
        this.getSocietes();
        this.getDepartements();
        this.getTypes();
        this.getComptes();
        this.selectedSociete = null;
    }).catch(err => {
        console.log(err);
    });
  }
  async getTypes() {
    await this.societeService.getTypes().then(res => {
      this.type_nom = res.data;
      this.type_nom.forEach(typ => {
        this.societeVisibility[typ.id] = false; // initialize visibility state for each row
        typ.typeList = typ.attributes.types.data;
        typ.checked = false;
        console.log(JSON.stringify(typ.typeList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async getDepartements() {
    await this.societeService.getDepartements().then(res => {
      this.dep_nom = res.data;
      this.dep_nom.forEach(dep => {
        this.societeVisibility[dep.id] = false; // initialize visibility state for each row
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
  async selectType(type){
    type.checked = !type.checked;
  }
  async selectCompte(compte){
    compte.checked = !compte.checked;
  }
  async getComptes() {
    await this.societeService.getComptes().then(res => {
      this.compte_email = res.data;
      this.compte_email.forEach(comp => {
        this.societeVisibility[comp.id] = false; // initialize visibility state for each row
        comp.comptesList = comp.attributes.compte.data;
        comp.checked = false;
        console.log(JSON.stringify(comp.comptesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  showCheckboxes(): void {
    const checkboxes = document.getElementById('checkboxes');
    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
  }
}
