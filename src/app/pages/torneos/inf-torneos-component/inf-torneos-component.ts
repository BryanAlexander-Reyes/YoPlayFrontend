import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { MidTorneoDetalle, MidTorneosService } from '../../../services/mid-torneos.service';
import { EquiposComponent } from '../equipos/equipos'; 
import { Fixture } from '../fixture/fixture';
import { catchError, finalize, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-inf-torneos-component',
  imports: [CommonModule,EquiposComponent,Fixture],
  templateUrl: './inf-torneos-component.html',
  styleUrl: './inf-torneos-component.css',
})
export class InfTorneosComponent  implements OnInit{
  torneo: MidTorneoDetalle | undefined;
  cargando = true;
  error = false;
  idTorneo: number | null = null;

  constructor (
    private route: ActivatedRoute,
    private readonly midTorneosService: MidTorneosService,
    private readonly ngZone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.cargarTorneo(id)),
    ).subscribe((torneo) => {
      this.ngZone.run(() => {
        this.torneo = torneo;
        this.changeDetector.detectChanges();
      });
    });
  }

  private cargarTorneo(id: number) {
    this.idTorneo = id;
    this.cargando = true;
    this.error = false;

    if (!Number.isInteger(id) || id <= 0) {
      this.error = true;
      this.cargando = false;
      return of(undefined);
    }

    return this.midTorneosService.obtenerTorneoPorId(id).pipe(
      catchError(() => {
        this.error = true;
        return of(undefined);
      }),
      finalize(() => {
        this.cargando = false;
        this.changeDetector.detectChanges();
      }),
    );
  }

}
