import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoasComponent } from './cadastro-pessoas.component';

describe('CadastroPessoasComponent', () => {
  let component: CadastroPessoasComponent;
  let fixture: ComponentFixture<CadastroPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
