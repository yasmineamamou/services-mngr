import { Component, EventEmitter, Output } from '@angular/core';
import { DepartementService } from './../../../services/departement.service';
@Component({
  selector: 'ngx-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.scss']
})
export class EditDepartementComponent {
  dep_nom: any;
  selectedDep: any;
  newDepName: string;
  editedDepName: string;
  depVisibility: { [key: string]: boolean } = {};
  societe_nom: any;
  selectedOptions = [];
  expanded = false;

  constructor(private departementService: DepartementService) {}

  @Output() onClose = new EventEmitter<void>();

  closeEditPopup() {
    this.onClose.emit();
  }
  ngOnInit() {
    this.getDepartements();
    this.getSocietes();
    const checkboxes = document.getElementById('checkboxes');
    checkboxes.style.display = 'none';
  }
  selectDepartement(event, dep) {
    event.preventDefault();
    this.selectedDep = dep;
    this.editedDepName = dep.attributes.nom;
  }
  async getDepartements() {
    await this.departementService.getDepartements().then(res => {
        this.dep_nom = res.data;
        this.dep_nom.forEach(dep => {
          this.depVisibility[dep.id] = false; // initialize visibility state for each row
          dep.societiesList = dep.attributes.societes.data;
          console.log(JSON.stringify(dep.societiesList));
          /*if(dep.societes.length > 0){ dep.societes.forEach(soci => { soci.selected = false; // initialize selection state for each societe }); }*/
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  async editDepartement() {
    console.log(this.editedDepName);
    let depSocietes: any[]=[];
    this.societe_nom.forEach(element => {
      if(element.checked == true){
        depSocietes.push(element);
      }
    });
    console.log("list soci dep "+depSocietes);
    let depData = { nom: this.editedDepName, societes: depSocietes};
    await this.departementService.editDepartement(this.selectedDep.id, depData).then(res => {
        console.log("new dep "+res.data);
        this.getSocietes();
        this.getDepartements();
    }).catch(err => {
        console.log(err);
    });
    location.reload();
  }
  async getSocietes() {
    await this.departementService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        this.depVisibility[soci.id] = false; // initialize visibility state for each row
        soci.societiesList = soci.attributes.societes.data;
        soci.checked = false;
        console.log(JSON.stringify(soci.societiesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectSociety(societe){
    societe.checked = !societe.checked;
  } 
  
}
