import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.html',
  styleUrl: './presentation.css',
})
export class Presentation implements OnInit, OnDestroy {
  readonly carouselInterval = 5000;
  readonly carouselImages = [
    '/images/carousel/tennis1.jpeg',
    '/images/carousel/basket.png',
    '/images/carousel/natacion.png',
    '/images/carousel/image.png',
  ];

  currentCarouselIndex = 0;
  private carouselTimer?: ReturnType<typeof setInterval>;
  private imageTransitionTimer?: ReturnType<typeof setTimeout>;
  private previousImageTimer?: ReturnType<typeof setTimeout>;
  previousImage?: string;
  imageEntering = true;

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    if (this.imageTransitionTimer) {
      clearTimeout(this.imageTransitionTimer);
    }
    if (this.previousImageTimer) {
      clearTimeout(this.previousImageTimer);
    }
  }

  get presentationImage(): string {
    return this.carouselImages[this.currentCarouselIndex];
  }

  private startCarousel(): void {
    if (this.carouselImages.length < 2) {
      return;
    }

    this.carouselTimer = setInterval(() => {
      this.showNextImage();
      this.changeDetector.detectChanges();
    }, this.carouselInterval);
  }

  private stopCarousel(): void {
    if (this.carouselTimer) {
      clearInterval(this.carouselTimer);
      this.carouselTimer = undefined;
    }
  }

  private showNextImage(): void {
    this.previousImage = this.presentationImage;
    this.imageEntering = false;
    this.currentCarouselIndex =
      (this.currentCarouselIndex + 1) % this.carouselImages.length;

    this.imageTransitionTimer = setTimeout(() => {
      this.imageEntering = true;
      this.imageTransitionTimer = undefined;
      this.changeDetector.detectChanges();
    }, 20);

    this.previousImageTimer = setTimeout(() => {
      this.previousImage = undefined;
      this.previousImageTimer = undefined;
      this.changeDetector.detectChanges();
    }, 900);
  }

  features = [
    {
      emoji: '⚡',
      title: 'Compite en Tiempo Real',
      description: 'Enfréntate a otros jugadores en torneos y desafíos instantáneos.',
    },
    {
      emoji: '💹',
      title: 'Demuestra tu Talento',
      description: 'Conviértete en uno de los mejores de la comunidad.',
    },
    {
      emoji: '🏆',
      title: 'Gana Premios',
      description: 'Participa en eventos y consigue recompensas exclusivas.',
    },
  ];
}