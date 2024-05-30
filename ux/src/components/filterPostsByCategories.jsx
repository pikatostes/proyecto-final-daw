const filterPostsByCategories = (posts, categories) => {
  // Verificar si posts no es undefined y si es un array antes de intentar filtrarlo
  if (posts && Array.isArray(posts)) {
    return posts.filter((post) => categories.includes(post.category));
  } else {
    // Si posts es undefined o no es un array, retornar un array vacío
    return [];
  }
};

export default filterPostsByCategories;
