# A basic webpage
Kohl Keilholtz

A webpage with the proper qualifications as per stated in the assignement description

Render link: https://kkeilholtzbasicwebpage.onrender.com/
Hello from Tawna!
<<<<<<< HEAD
## ER Diagrams

```mermaid
---
title: Kohl Keilholtz Project ER diagrams
---
erDiagram

  periods {
    id Serial pk
    count INT "Count"
  }

  commas {
    id Serial pk
    count INT "Count"
  }

  the {
    id Serial pk
    count INT "Count"
  }

  and {
    id Serial pk
    count INT "Count"
  }
---

=======

## ER Diagram
```mermaid
---
title: Night of No Sleep
---
erDiagram
    data ||--|{ periods : contains
    data ||--|{ commas : contains
    data ||--|{ the : contains
    data ||--|{ and : contains
    data {
        id SERIAL pk
        countPeriods INT "total periods"
        countCommas INT "total commas"
        countThe INT "total the"
        countAnd INT "total and"
    }
    periods {
        id SERIAL pk
        count INT "total"
    }
    commas {
        id SERIAL pk
        count INT "total"
    }
    the {
        id SERIAL pk
        count INT "total"
    }
    and {
        id SERIAL pk
        count INT "total"
    }
   
>>>>>>> d4bb9fe7a0a528a2ebe5b6e3cc23e891a5b40242
