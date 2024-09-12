import prisma from "@/prisma";
import dynamic from "next/dynamic";
const MermaidComponent = dynamic(
  () => import("@/components/roadmap/MermaidRender"),
  { ssr: false },
);

const demochart = `graph TD
    %% Vertical roadmap for Frontend Development

    A[Frontend Development Roadmap] --> B["""<b>Core Skills</b><br/>Fundamental knowledge"""]
    
    %% Core Skills with subtopics (HTML, CSS, JS)
    B --> C["""<b>HTML</b><br/>Structure of webpages"""]
    B --> D["""<b>CSS</b><br/>Styling of webpages"""]
    B --> E["""<b>JavaScript</b><br/>Programming logic"""]

    %% Optional: Core Skills (Accessibility)
    B -.-> F["""<b>Accessibility</b><br/>(Optional)<br/>Improving web accessibility"""]

    %% Next main topic (Frameworks)
    B --> G["""<b>Frameworks</b><br/>Building complex UIs"""]
    
    %% 'Or' choice between frameworks
    G --> H["""<b>React</b><br/>(Most Popular)"""]
    G --> I["""<b>Vue.js</b><br/>(Easy to learn)"""]
    G --> J["""<b>Angular</b><br/>(For large-scale apps)"""]

    %% Optional: Frameworks (Svelte)
    G -.-> K["""<b>Svelte</b><br/>(Optional)<br/>A lightweight framework"""]

    %% State Management
    G --> L["""<b>State Management</b><br/>Handling app state"""]
    
    %% 'Or' choice for state management
    L --> M["""<b>Redux</b><br/>Popular choice"""]
    L --> N["""<b>Context API</b><br/>(Simple & native)"""]
    L --> O["""<b>Vuex</b><br/>(For Vue apps)"""]

    %% Build Tools
    L --> P["""<b>Build Tools</b><br/>Optimizing assets"""]
    
    %% 'Or' choice for build tools
    P --> Q["""<b>Webpack</b><br/>Highly configurable"""]
    P --> R["""<b>Parcel</b><br/>Zero-config bundler"""]
    P --> S["""<b>Rollup</b><br/>For libraries"""]

    %% Testing
    P --> T["""<b>Testing</b><br/>Ensuring app stability"""]
    
    %% 'Or' choice for testing tools
    T --> U["""<b>Jest</b><br/>Unit testing"""]
    T --> V["""<b>Mocha</b><br/>Feature-rich testing"""]
    T --> W["""<b>Chai</b><br/>(Optional)<br/>Assertions library"""]

    %% Deployment
    T --> X["""<b>Deployment</b><br/>Launching apps"""]

    %% 'Or' choice for deployment platforms
    X --> Y["""<b>Netlify</b><br/>Fast & easy"""]
    X --> Z["""<b>Vercel</b><br/>Great for Next.js"""]
    X --> AA["""<b>GitHub Pages</b><br/>(Optional)<br/>Static site hosting"""]

  
`;

export default async function page({ params }: { params: { id: string } }) {
  const chart = await prisma.roadMap.findUnique({
    where: {
      id: params.id[0],
    },
    select: {
      mermaidSyntax: true,
      title: true,
    },
  });
  return (
    <div className="flex h-full w-full items-center overflow-auto">
      <MermaidComponent
        id={params.id[0]}
        chart={chart?.mermaidSyntax ?? demochart}
        prompt={chart?.title ?? "Roadmap"}
      />
    </div>
  );
}
