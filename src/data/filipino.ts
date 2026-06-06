import { Question, SubjectCategory, LevelOfExam } from "../types";

export const filipinoQuestions: Question[] = [
  {
    id: "f_kas_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasingkahulugan",
    questionText: "Piliin ang pinaka-angkop na kasingkahulugan ng salitang nakapahilig sa pangungusap:\n\n*Nauulinigan* ang pag-uusap ng grupo dahil sa lakas ng tinig nila.",
    options: ["nahihimigan", "napakikinggan", "nakikita", "nararamdaman"],
    correctOptionIndex: 1, // napakikinggan
    explanation: "Ang 'nauulinigan' ay galing sa salitang 'ulinig' na ang ibig sabihin ay marinig o mapakinggan ng bahagya.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_kas_2",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasingkahulugan",
    questionText: "Piliin ang pinaka-angkop na kasingkahulugan ng salitang nakapahilig sa pangungusap:\n\nKarapatan ng bawat batang Pilipino ang magkaroon ng pamilyang *mag-aaruga* sa kanya.",
    options: ["mag-aalaga", "magsasaway", "gagabay", "tutulong"],
    correctOptionIndex: 0, // mag-aalaga
    explanation: "Ang salitang 'aaruga' o 'pag-aaruga' ay nangangahulugang pag-aalaga o pagkalinga.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_kas_3",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasingkahulugan",
    questionText: "Piliin ang pinaka-angkop na kasingkahulugan ng salitang nakapahilig sa pangungusap:\n\n*Nagugulumihanan* si Rochelle kung anong kurso ang kanyang kukunin sa kolehiyo.",
    options: ["nagtataka", "natutuwa", "nagpapasalamat", "nalilito"],
    correctOptionIndex: 3, // nalilito
    explanation: "Ang 'gulumihan' o 'nagugulumihanan' ay nangangahulugang nalilito, alumpihit, o hindi mapakali dahil sa pag-iisip.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_kas_4",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasingkahulugan",
    questionText: "Piliin ang pinaka-angkop na kasingkahulugan ng salitang nakapahilig sa pangungusap:\n\n*Tigib* na ng pasahero ang dyip nang ito ay umalis.",
    options: ["punung-puno", "kulang-kulang", "kaunting-kaunti", "maraming-marami"],
    correctOptionIndex: 0, // punung-puno
    explanation: "Ang salitang 'tigib' ay katumbas ng punung-puno, lipos, o siksik.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_sal_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasalungat",
    questionText: "Piliin ang pinaka-angkop na kasalungat ng salitang nakapahilig sa pangungusap:\n\nAng pag-iibigan nina Florante at Laura ay *matimyas*.",
    options: ["di-magmamaliw", "di-totoo", "dalisay", "wagas"],
    correctOptionIndex: 1, // di-totoo
    explanation: "Ang 'matimyas' ay nangangahulugang wagas, tapat, o dalisay. Ang kasalungat nito ay 'di-totoo' o mapagkunwari.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_sal_2",
    category: SubjectCategory.FILIPINO,
    subcategory: "Kasalungat",
    questionText: "Piliin ang pinaka-angkop na kasalungat ng salitang nakapahilig sa pangungusap:\n\nNilalagyan ng pataba ang halaman upang ito ay *yumabong*.",
    options: ["lumago", "dumami", "malanta", "lumiit"],
    correctOptionIndex: 2, // malanta
    explanation: "Ang 'yumabong' ay nangangahulugang sumibol nang malago at malusog. Ang kasalungat nito ay 'malanta'.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_kaw_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Mga Kawikaan",
    questionText: "Piliin ang kasingkahulugan ng matatalinghagang salita nakapahilig sa pangungusap:\n\nHindi totoo ang kanyang katapangan sapagkat *bahag ang buntot* niya sa harap ng paghihirap.",
    options: ["malakas ang loob", "matapang", "duwag", "matiyaga"],
    correctOptionIndex: 2, // duwag
    explanation: "Ang sawikain o idiom na 'bahag ang buntot' ay naglalarawan sa isang taong takot, naduduwag, o walang lakas ng loob.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_kaw_2",
    category: SubjectCategory.FILIPINO,
    subcategory: "Mga Kawikaan",
    questionText: "Piliin ang kasingkahulugan ng matatalinghagang salita nakapahilig sa pangungusap:\n\nDahil sa paulit-ulit na pagsisinungaling, *basa ang papel* niya sa karamihan.",
    options: ["ayaw nang paniwalaan", "ayaw nang pagbigyan", "ayaw nang pakinggan", "ayaw nang makasama"],
    correctOptionIndex: 0, // ayaw nang paniwalaan / sira ang reputasyon
    explanation: "Ang idiom na 'basa ang papel' ay nangangahulugang sira na ang reputasyon kung kaya't wala nang tiwala ang mga tao sa kaniya o ayaw nang paniwalaan.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_gam_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Wastong Gamit",
    questionText: "Piliin ang tamang salita na angkop sa patlang:\n\nKatungkulan _________ sinuman ang tumulong sa kanyang kapwa.",
    options: ["nang", "ng", "namin", "natin"],
    correctOptionIndex: 1, // ng
    explanation: "Ang 'ng' ay ginagamit upang magpakita ng pagmamay-ari (katungkulan ng sinuman). Ang 'nang' naman ay karaniwang ginagamit sa panimula ng sugnay na di-nakapag-iisa o sumasagot sa tanong na paano.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_gam_2",
    category: SubjectCategory.FILIPINO,
    subcategory: "Wastong Gamit",
    questionText: "Piliin ang tamang salita na angkop sa patlang:\n\nNagulat ang mga tao _________ mabalitaan ang kaguluhang nagaganap sa Mindanao.",
    options: ["nang", "ng", "noon", "datapwat"],
    correctOptionIndex: 0, // nang
    explanation: "Ginagamit ang 'nang' katumbas ng 'noong' (nang mabalitaan = noong mabalitaan) o kapag sumasagot sa 'kailan'.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_mali_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Pagkilala sa Mali",
    questionText: "Basahing mabuti ang pangungusap. Piliin ang bahaging may mali. Kung walang mali, piliin ang 'Walang mali'.\n\n(a) {@underline Ang walang kamatayang} (b) {@underline Mi Ultimo Adios} (c) {@underline ay sinulat ng} Rizal sa Fort Santiago. (d) {@underline Walang mali}.",
    options: [
      "Ang walang kamatayang",
      "Mi Ultimo Adios",
      "ay sinulat ng",
      "Walang mali"
    ],
    correctOptionIndex: 2, // ay sinulat ng -> should be 'ay isinulat ni' Rizal
    explanation: "May mali sa 'ay sinulat ng Rizal'. Ang wastong gamit ay pantukoy na 'ni' para sa tanging ngalan ng tao (isinulat ni Rizal).",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  },
  {
    id: "f_bin_1",
    category: SubjectCategory.FILIPINO,
    subcategory: "Pag-unawa sa Binasa",
    passage: "“Ang kabataan ang pag-asa ng bayan.” Ito ang sinabi ni Dr. Jose Rizal, ang ating pambansang bayani. Malaki ang pagtitiwala niya sa angking talino at kakayahan ng mga kabataan. Naniniwala siya na mahahango ang bansang Pilipinas sa tiyak na kasawian kung sila, ang mga kabataan, ang magkakaroon ng tunay na pag-ibig sa bayan.",
    questionText: "Paano maiaahon ng kabataan ang bansang Pilipinas sa tiyak na kasawian ayon sa talata?",
    options: [
      "Sa pamamagitan ng pagkakaroon ng tunay na pag-ibig sa bayan.",
      "Sa pamamagitan ng pagtugon sa kani-kaniyang kagustuhan lamang.",
      "Sa pamamagitan ng pag-aaral ng wikang banyaga.",
      "Walang tamang sagot sa mga pagpipilian."
    ],
    correctOptionIndex: 0, // Tunay na pag-ibig sa bayan
    explanation: "Direktang nakasaad sa huling pangungusap ng talata na makakamit ito kapag ang mga kabataan ay nagkaroon ng tunay na pag-ibig sa bayan.",
    level: [LevelOfExam.PROFESSIONAL, LevelOfExam.SUB_PROFESSIONAL]
  }
];
