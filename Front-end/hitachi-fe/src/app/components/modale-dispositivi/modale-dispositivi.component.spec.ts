import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModaleDispositiviComponent } from './modale-dispositivi.component';



describe('ModaleDispositiviComponent', () => {
  let component: ModaleDispositiviComponent;
  let fixture: ComponentFixture<ModaleDispositiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleDispositiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleDispositiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
