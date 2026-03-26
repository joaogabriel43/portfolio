export interface Certificate {
  id: string;
  name: string;
  institution: string;
  year: number;
  url?: string;
  badgeUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: "java-web",
    name: "Formação Java Web com Spring Boot",
    institution: "Alura",
    year: 2024,
    url: "",
  },
  {
    id: "java-oo",
    name: "Formação Java com Orientação a Objetos",
    institution: "Alura",
    year: 2024,
    url: "",
  },
  {
    id: "frontend-alura",
    name: "Formação Desenvolvimento Front-end",
    institution: "Alura",
    year: 2023,
    url: "",
  },
  {
    id: "csharp-alura",
    name: "C# e Orientação a Objetos",
    institution: "Alura",
    year: 2022,
    url: "",
  },
  {
    id: "cisco-essentials",
    name: "IT Essentials",
    institution: "Cisco",
    year: 2019,
    url: "",
  },
];
