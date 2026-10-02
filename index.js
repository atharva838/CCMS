const categories = [
  {title:"Street Damage",description:"Potholes, broken roads and damaged footpaths.",department:"Road & Transport",icon:"🛣️"},
  {title:"Water Leakage",description:"Leaking pipelines, water overflow and low pressure.",department:"Water Supply",icon:"💧"},
  {title:"Street Light Issue",description:"Non-working street lights or flickering lamps.",department:"Electricity",icon:"💡"},
  {title:"Garbage & Waste",description:"Overflowing bins and uncollected garbage.",department:"Solid Waste Management",icon:"♻️"},
  {title:"Drainage Problem",description:"Blocked drains, waterlogging and unpleasant odours.",department:"Drainage",icon:"🚰"},
  {title:"Public Toilet Issue",description:"Unclean or damaged public toilet facilities.",department:"Public Health",icon:"🚻"},
  {title:"Illegal Construction",description:"Possible unauthorised construction or encroachment.",department:"Urban Planning",icon:"🏗️"},
  {title:"Traffic Signal Problem",description:"Damaged signs or traffic signals that do not work.",department:"Traffic & Signals",icon:"🚦"},
  {title:"Public Property Damage",description:"Damaged benches, parks, bus stops or other public assets.",department:"Municipal Corporation",icon:"🏞️"},
  {title:"Industrial Area Issue",description:"Pollution or civic infrastructure issues near industrial zones.",department:"Environment",icon:"🏭"}
];
const container = document.getElementById("categorycontainer");
container.innerHTML = categories.map((category, index) => `
  <article class="category-card" style="animation-delay:${index * 55}ms">
    <div class="category-icon" aria-hidden="true">${category.icon}</div>
    <h3>${category.title}</h3><p>${category.description}</p>
    <small>↗ ${category.department}</small>
  </article>`).join("");
localStorage.setItem("categories", JSON.stringify(categories));