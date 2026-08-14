import { Component } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { Header } from "../../layout/header/header";

@Component({
  selector: 'app-tyc',
  imports: [Footer, Header],
  templateUrl: './tyc.html',
  styleUrl: './tyc.css',
})
export class Tyc {}
