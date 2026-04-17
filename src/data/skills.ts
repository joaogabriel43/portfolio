export interface SkillGroup {
  group: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    group: "Backend",
    icon: "Server",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "C#",
      ".NET",
      "ASP.NET Core",
      "REST API Design",
    ],
  },
  {
    group: "Frontend",
    icon: "Monitor",
    skills: [
      "TypeScript",
      "Angular",
      "JavaScript",
      "HTML5",
      "CSS3",
      "React",
      "Acessibilidade Web",
      "Design Responsivo",
    ],
  },
  {
    group: "Banco de Dados",
    icon: "Database",
    skills: [
      "SQL Server",
      "PostgreSQL",
      "Stored Procedures",
      "Query Optimization",
    ],
  },
  {
    group: "Arquitetura",
    icon: "Layers",
    skills: [
      "Clean Architecture",
      "DDD",
      "Hexagonal",
      "SOLID",
      "REST API Design",
      "Scrum",
      "Kanban",
    ],
  },
  {
    group: "DevOps",
    icon: "GitBranch",
    skills: [
      "Git",
      "Docker",
      "CI/CD",
      "Vercel",
      "Ansible",
      "Terraform",
    ],
  },
  {
    group: "Testes",
    icon: "FlaskConical",
    skills: [
      "JUnit 5",
      "Mockito",
      "TDD",
    ],
  },
  {
    group: "Soft Skills",
    icon: "Lightbulb",
    skills: [
      "Autodidata",
      "Comunicativo",
      "Criativo",
      "Flexível",
      "Proativo",
      "Persistente",
    ],
  },
];
