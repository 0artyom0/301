import AUTHOR_1 from "../../assets/projectAuthor/1.svg";
import PROJECT_1 from "../../assets/projectAuthor/project-1.png";
import FULL_PROJECT_1 from "../../assets/projectAuthor/project-full-1.svg";
import ROSGOSTRAKH from "../../assets/info/rostgostrakh.svg";
import BETCONSTRUCT from "../../assets/info/betconstruct.png";
import DIGITAIN from "../../assets/info/digitain.png";
import ROSE_CIRCLE from "../../assets/projectAuthor/rose-circle.png";
import GREEN_CIRCLE from "../../assets/projectAuthor/green-circle.png";
import ORANGE_CIRCLE from "../../assets/projectAuthor/orange-circle.png";
import YELLOW_CIRCLE from "../../assets/projectAuthor/yellow-circle.png";
import BLUE_CIRCLE from "../../assets/projectAuthor/blue-circle.png";
import PURPLE_CIRCLE from "../../assets/projectAuthor/purple-circle.png";
import PERSON_1 from "../../assets/projectAuthor/person-1.svg";
import PERSON_2 from "../../assets/projectAuthor/person-2.png";

interface PartnersTypes {
  id: number;
  name: string;
  img: string;
}

interface WorkTeamTypes {
  id: number;
  name: string;
  position: string;
  img: string;
  bgImg: string;
}
export interface ProjectTypes {
  id: number;
  author: string;
  authorImg: string;
  title: string;
  flag: number;
  desc: string;
  isSaved: boolean;
  img: string;
  type: string;
  fullImg: string;
  problem: string;
  budget: number;
  collected: number;
  remaining: number;
  workTeam: WorkTeamTypes[];
  partners: PartnersTypes[];
}

export const typeBtn = [
  {
    id: 1,
    name: "Education",
    type: "education",
  },
  {
    id: 2,
    name: "Science",
    type: "science",
  },
  {
    id: 3,
    name: "Culture",
    type: "culture",
  },
  {
    id: 4,
    name: "Innovation",
    type: "innovation",
  },
  {
    id: 5,
    name: "Territory development",
    type: "territory-development",
  },
  {
    id: 6,
    name: "Ontology",
    type: "ontology",
  },
  {
    id: 7,
    name: "All",
    type: "all",
  },
];

export const projectsData = [
  {
    id: 1,
    name: "Project Ideas we offer",
    projects: [
      {
        id: 1,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "education",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 2,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "education",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 3,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "science",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 4,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "science",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Projects we fundraise",
    projects: [
      {
        id: 1,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "innovation",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 2,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "territory-development",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 3,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "ontology",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 4,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "education",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 5,
        author: "Peter John",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "education",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 6,
        author: "Peter Smith",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "culture",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 7,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "culture",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 8,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "culture",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 9,
        author: "Peter Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "innovation",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
      {
        id: 10,
        author: "John Nemoy",
        authorImg: AUTHOR_1,
        title: "301 Land of Wisdom",
        flag: 15,
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        isSaved: false,
        img: PROJECT_1,
        type: "innovation",
        fullImg: FULL_PROJECT_1,
        problem:
          "Фонд «301. Земля мудрости» — некоммерческая организация и осуществляет свою деятельность с помощью взносов участников клуба «301». Размер взноса составляет 301$ в месяц. Участником клуба может стать каждый, кто разделяет нашу миссию и ценности вне зависимости от географических границ.",
        budget: 1500,
        collected: 800,
        remaining: 700,
        workTeam: [
          {
            id: 1,
            name: "Julie Barnes",
            position: "Project Manager",
            bgImg: ROSE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 2,
            name: "Den Brown",
            position: "Donor",
            bgImg: GREEN_CIRCLE,
            img: [PERSON_1, PERSON_2],
          },
          {
            id: 3,
            name: "Anna Moore",
            position: "ambassador",
            bgImg: ORANGE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 4,
            name: "Nicole McConaughey",
            position: "volunteer",
            bgImg: YELLOW_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 5,
            name: "Jack Jackman",
            position: "expert",
            bgImg: BLUE_CIRCLE,
            img: [PERSON_1],
          },
          {
            id: 6,
            name: "Den Farrell",
            position: "partner",
            bgImg: PURPLE_CIRCLE,
            img: [PERSON_1],
          },
        ],
        partners: [
          {
            id: 1,
            name: "Rosgostrakh",
            img: ROSGOSTRAKH,
          },
          {
            id: 2,
            name: "Betconstruct",
            img: BETCONSTRUCT,
          },
          {
            id: 3,
            name: "Digitain",
            img: DIGITAIN,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Projects we Launched",
    projects: [],
  },
];
