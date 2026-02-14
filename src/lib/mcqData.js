export const biologyMCQs = [
  {
    id: 1,
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    correct: 1,
    chapter: "Cell Biology",
    subject: "Biology"
  },
  {
    id: 2,
    question: "What is the functional unit of the kidney?",
    options: ["Nephron", "Neuron", "Alveoli", "Hepatocyte"],
    correct: 0,
    chapter: "Human Physiology",
    subject: "Biology"
  },
  {
    id: 3,
    question: "DNA replication occurs during which phase of the cell cycle?",
    options: ["G1 phase", "S phase", "G2 phase", "M phase"],
    correct: 1,
    chapter: "Cell Cycle",
    subject: "Biology"
  },
  {
    id: 4,
    question: "Which blood group is known as the universal donor?",
    options: ["A+", "B+", "AB+", "O-"],
    correct: 3,
    chapter: "Blood Groups",
    subject: "Biology"
  },
  {
    id: 5,
    question: "Photosynthesis primarily occurs in which part of the plant cell?",
    options: ["Mitochondria", "Nucleus", "Chloroplast", "Vacuole"],
    correct: 2,
    chapter: "Photosynthesis",
    subject: "Biology"
  },
  {
    id: 6,
    question: "What is the basic unit of heredity?",
    options: ["Chromosome", "Gene", "DNA", "RNA"],
    correct: 1,
    chapter: "Genetics",
    subject: "Biology"
  },
  {
    id: 7,
    question: "Which enzyme is responsible for unwinding DNA during replication?",
    options: ["DNA polymerase", "Helicase", "Ligase", "Primase"],
    correct: 1,
    chapter: "Molecular Biology",
    subject: "Biology"
  },
  {
    id: 8,
    question: "The human heart has how many chambers?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    chapter: "Circulatory System",
    subject: "Biology"
  },
  {
    id: 9,
    question: "Which hormone regulates blood sugar levels?",
    options: ["Thyroxine", "Insulin", "Adrenaline", "Estrogen"],
    correct: 1,
    chapter: "Endocrine System",
    subject: "Biology"
  },
  {
    id: 10,
    question: "What is the site of protein synthesis?",
    options: ["Nucleus", "Ribosome", "Lysosome", "Peroxisome"],
    correct: 1,
    chapter: "Cell Biology",
    subject: "Biology"
  },
  {
    id: 11,
    question: "Which gas is released during photosynthesis?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correct: 2,
    chapter: "Photosynthesis",
    subject: "Biology"
  },
  {
    id: 12,
    question: "The process of cell division that produces gametes is called:",
    options: ["Mitosis", "Meiosis", "Binary fission", "Budding"],
    correct: 1,
    chapter: "Reproduction",
    subject: "Biology"
  },
  {
    id: 13,
    question: "Which nitrogenous base is found in RNA but not in DNA?",
    options: ["Adenine", "Guanine", "Thymine", "Uracil"],
    correct: 3,
    chapter: "Molecular Biology",
    subject: "Biology"
  },
  {
    id: 14,
    question: "The largest organ in the human body is:",
    options: ["Liver", "Brain", "Skin", "Heart"],
    correct: 2,
    chapter: "Human Anatomy",
    subject: "Biology"
  },
  {
    id: 15,
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    correct: 2,
    chapter: "Nutrition",
    subject: "Biology"
  },
  {
    id: 16,
    question: "The structural and functional unit of the nervous system is:",
    options: ["Nephron", "Neuron", "Axon", "Dendrite"],
    correct: 1,
    chapter: "Nervous System",
    subject: "Biology"
  },
  {
    id: 17,
    question: "Which blood vessel carries oxygenated blood from the lungs to the heart?",
    options: ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
    correct: 1,
    chapter: "Circulatory System",
    subject: "Biology"
  },
  {
    id: 18,
    question: "What is the pH of human blood?",
    options: ["6.5-6.8", "7.0-7.2", "7.35-7.45", "8.0-8.5"],
    correct: 2,
    chapter: "Human Physiology",
    subject: "Biology"
  },
  {
    id: 19,
    question: "Which organelle is responsible for detoxification in liver cells?",
    options: ["Rough ER", "Smooth ER", "Golgi body", "Lysosome"],
    correct: 1,
    chapter: "Cell Biology",
    subject: "Biology"
  },
  {
    id: 20,
    question: "The exchange of gases in the lungs occurs in:",
    options: ["Bronchi", "Trachea", "Alveoli", "Bronchioles"],
    correct: 2,
    chapter: "Respiratory System",
    subject: "Biology"
  }
]

export function getRandomMCQs(count = 10) {
  const shuffled = [...biologyMCQs].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
