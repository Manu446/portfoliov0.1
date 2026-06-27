export type PhotoCategory = "wedding" | "landscape" | "nature"

export interface Photo {
  id: number
  src: string
  title: string
  category: PhotoCategory
  location: string
  description: string
  span: string
}

export const PHOTO_CATEGORIES: {
  id: PhotoCategory | "all"
  label: string
}[] = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Weddings" },
  { id: "landscape", label: "Landscape" },
  { id: "nature", label: "Nature" },
]

export const categoryLabels: Record<PhotoCategory, string> = {
  wedding: "Wedding",
  landscape: "Landscape",
  nature: "Nature",
}

export const categoryPluralLabels: Record<PhotoCategory, string> = {
  wedding: "Weddings",
  landscape: "Landscapes",
  nature: "Nature",
}

// Kenya-only gallery — weddings, landscapes, and nature shot across the country.
export const photos: Photo[] = [
  {
    id: 1,
    src: "/photography/wedding-4.jpg",
    title: "The Send-Off",
    category: "wedding",
    location: "Karen, Nairobi",
    description: "Petal confetti rains over the couple's first kiss at a garden ceremony in Nairobi's Karen suburb.",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "/photography/wedding-2.jpg",
    title: "The Rings",
    category: "wedding",
    location: "Westlands, Nairobi",
    description: "A quiet detail of joined hands and bands resting on the bridal bouquet.",
    span: "",
  },
  {
    id: 3,
    src: "/photography/wedding-3.jpg",
    title: "Golden Hour Walk",
    category: "wedding",
    location: "Naivasha",
    description: "The newlyweds share a laugh beneath a palm at dusk near Lake Naivasha.",
    span: "row-span-2",
  },
  {
    id: 4,
    src: "/photography/wedding-1.jpg",
    title: "Reception Table",
    category: "wedding",
    location: "Kiambu",
    description: "Wildflower centerpieces and gingham details along a long countryside reception table.",
    span: "col-span-2",
  },
  {
    id: 5,
    src: "/photography/wedding-5.jpg",
    title: "Balloon Release",
    category: "wedding",
    location: "Nairobi",
    description: "Guests cheer as the couple releases balloons over a poolside reception.",
    span: "",
  },
  {
    id: 6,
    src: "/photography/landscape-1.jpg",
    title: "Lone Acacia",
    category: "landscape",
    location: "Tsavo",
    description: "A single acacia stands against a burning savanna sunset in Tsavo.",
    span: "col-span-2 row-span-2",
  },
  {
    id: 7,
    src: "/photography/landscape-5.jpg",
    title: "Kilimanjaro View",
    category: "landscape",
    location: "Amboseli",
    description: "Snow-capped Kilimanjaro rises above the acacia-dotted plains of Amboseli.",
    span: "col-span-2",
  },
  {
    id: 8,
    src: "/photography/landscape-2.jpg",
    title: "Savanna Sundown",
    category: "landscape",
    location: "Maasai Mara",
    description: "A giraffe drifts through golden haze as the sun sets over the Mara.",
    span: "row-span-2",
  },
  {
    id: 9,
    src: "/photography/landscape-3.jpg",
    title: "Diani Coastline",
    category: "landscape",
    location: "Diani Beach",
    description: "Turquoise shallows breaking onto white sand along Kenya's south coast.",
    span: "",
  },
  {
    id: 10,
    src: "/photography/landscape-4.jpg",
    title: "Coast Sunrise",
    category: "landscape",
    location: "Watamu",
    description: "First light spilling across calm water and soft surf on the Watamu shore.",
    span: "col-span-2",
  },
  {
    id: 11,
    src: "/photography/nature-1.jpg",
    title: "Right of Way",
    category: "nature",
    location: "Lewa Conservancy",
    description: "A rhino and her calf cross the track as zebra and impala gather beyond.",
    span: "col-span-2",
  },
  {
    id: 12,
    src: "/photography/nature-4.jpg",
    title: "The Patriarch",
    category: "nature",
    location: "Maasai Mara",
    description: "A lone bull elephant strides across golden grassland at first light.",
    span: "",
  },
  {
    id: 13,
    src: "/photography/nature-3.jpg",
    title: "Among the Green",
    category: "nature",
    location: "Lake Nakuru",
    description: "Two zebra pause in lush forest undergrowth after the rains.",
    span: "row-span-2",
  },
  {
    id: 14,
    src: "/photography/nature-2.jpg",
    title: "Plains Gathering",
    category: "nature",
    location: "Nairobi National Park",
    description: "Giraffe and grazing zebra share the grassland on a cool morning.",
    span: "",
  },
  {
    id: 15,
    src: "/photography/nature-5.jpg",
    title: "Forest Light",
    category: "nature",
    location: "Aberdare",
    description: "Soft beams threading through misty indigenous forest in the Aberdare Range.",
    span: "col-span-2",
  },
]

export function getPhotosByCategory(category: PhotoCategory | "all"): Photo[] {
  if (category === "all") return photos
  return photos.filter((photo) => photo.category === category)
}
