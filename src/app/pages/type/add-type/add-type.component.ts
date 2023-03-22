import { Component, EventEmitter, Output   } from '@angular/core';
import { TypeService } from "./../../../services/type.service";
@Component({
  selector: 'ngx-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent {
  type_nom: any;
  typeVisibility: { [key: string]: boolean } = {};
  newTypeName: string;
  editedTypeName: string;
  societe_nom: any;
  selectedType: any;
  selectedOptions = [];
  expanded = false;

  constructor(private typeService: TypeService){}
  @Output() onClose = new EventEmitter<void>();

  closeAddPopup() {
    this.onClose.emit();
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
        }); 
      })
      .catch(err => {
        console.log(err);
    });
  }
  async addType() {
    console.log(this.newTypeName);
    let typSocietes: any[]=[];
    this.societe_nom.forEach(element => {
      if(element.checked == true){
        typSocietes.push(element);
      }
    });
    console.log("list soci typ "+typSocietes);
    let typeData = { type: this.newTypeName, societes: typSocietes};
    await this.typeService.addType(typeData).then(res => {
      console.log("new typ "+res.data);
        this.getSocietes();
        this.getTypes();
        this.newTypeName = '';
    }).catch(err => {
        console.log(err);
    });
    location.reload();
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