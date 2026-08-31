import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBar } from './tournament-bar';

describe('TournamentBar', () => {
  let component: TournamentBar;
  let fixture: ComponentFixture<TournamentBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentBar],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the tournament labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Torneos en curso');
    expect(compiled.textContent).toContain('Torneos Activos');
  });
});
