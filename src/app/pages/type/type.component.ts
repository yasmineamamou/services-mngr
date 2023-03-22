import { Component } from '@angular/core';
import { TypeService } from "./../../services/type.service";
import { MatDialog } from '@angular/material/dialog';
import { AddTypeComponent } from "./add-type/add-type.component";

@Component({
  selector: 'ngx-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  p: number = 1;
  type_nom: any;
  typeVisibility: { [key: string]: boolean } = {};
  newTypeName: string;
  editedTypeName: string;
  societe_nom: any;
  selectedType: any;
  selectedOptions = [];
  expanded = false;

  constructor(private typeService: TypeService,public dialog: MatDialog){}
  openAddPopup() {
    this.dialog.open(AddTypeComponent); 
  }
  ngOnInit() {
    this.getTypes();
    this.getSocietes();
    const checkboxes = document.getElementById('checkboxes');
    checkboxes.style.display = 'none';
  }
  selectType(event, typ) {
    event.preventDefault();
    this.selectedType = typ;
    this.editedTypeName = typ.attributes.type;
  }
  async getTypes() {
    await this.typeService.getTypes().then(res => {
        this.type_nom = res.data;
        this.type_nom.forEach(typ => { 
          this.typeVisibility[typ.id] = false; // initialize visibility state for each row
          typ.societesList = typ.attributes.societes.data;
          console.log(JSON.stringify(typ.societesList));
          /*if(dep.societes.length > 0){ dep.societes.forEach(soci => { soci.selected = false; // initialize selection state for each societe }); }*/
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  async editType() {
    console.log(this.editedTypeName);
    let typSocietes: any[]=[];
    this.societe_nom.forEach(element => {
      if(element.checked == true){
        typSocietes.push(element);
      }
    });
    console.log("list soci typ "+typSocietes);
    let typeData = { type: this.editedTypeName, societes: typSocietes};
    await this.typeService.editType(this.selectedType.id, typeData).then(res => {
        console.log("new typ "+res.data);
        this.getSocietes();
        this.getTypes();
    }).catch(err => {
        console.log(err);
    }); 
  }
  async deleteType() {
    await this.typeService.deleteType(this.selectedType.id).then(res => {
        console.log(res.data);
        this.getSocietes();
        this.getTypes();
        this.selectedType = null;
    }).catch(err => {
        console.log(err);
    });
  }
  async getSocietes() {
    await this.typeService.getSocietes().then(res => {
      this.societe_nom = res.data;
      this.societe_nom.forEach(soci => {
        this.typeVisibility[soci.id] = false; // initialize visibility state for each row
        soci.societesList = soci.attributes.societes.data;
        soci.checked = false;
        console.log(JSON.stringify(soci.societesList));
        }); 
    }).catch(err => {
        console.log(err);
    });
  }
  async selectSociety(societe){
    societe.checked = !societe.checked;
  } 
}
