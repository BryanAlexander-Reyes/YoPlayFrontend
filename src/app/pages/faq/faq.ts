import { Component } from '@angular/core';

interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FAQ {
  expandedQuestion: number | null = null;

  readonly preguntas: PreguntaFrecuente[] = [
    {
      pregunta: '¿Cómo puedo registrarme en YoPlay?',
      respuesta: 'Selecciona la opción de registro, completa tus datos y acepta los Términos y Condiciones de la plataforma.',
    },
    {
      pregunta: '¿Cómo puedo inscribirme en un torneo?',
      respuesta: 'Ingresa a la sección de torneos, revisa la información disponible y sigue las instrucciones de inscripción del torneo que elijas.',
    },
    {
      pregunta: '¿Dónde puedo consultar mis torneos?',
      respuesta: 'En Información General encontrarás Torneos Inscritos y Torneos Participantes para consultar tus registros y participaciones.',
    },
    {
      pregunta: '¿Cómo creo o registro un equipo?',
      respuesta: 'Desde la sección de organización puedes crear un torneo y registrar los equipos que participarán en él.',
    },
    {
      pregunta: '¿Qué hago si olvidé mi contraseña?',
      respuesta: 'Usa la opción de restablecimiento de contraseña en la pantalla de inicio de sesión y sigue los pasos indicados.',
    },
    {
      pregunta: '¿Cómo protegen mis datos personales?',
      respuesta: 'Tus datos se almacenan con medidas de protección y solo se utilizan para el funcionamiento de la plataforma. Consulta la sección Privacidad para conocer más detalles.',
    },
  ];

  toggleQuestion(index: number): void {
    this.expandedQuestion = this.expandedQuestion === index ? null : index;
  }
}
