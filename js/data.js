/* exported data */
const data = {
  view: 'characterList',
  currentCardIndex: null
  // characters: [
  //   {
  //     name: 'mario',
  //     imgURL: 'chara_5_mario_00.png'
  //   },
  //   {
  //     name: 'donkey kong',
  //     imgURL: 'chara_5_donkey_kong_00.png'
  //   },
  //   {
  //     name: 'link',
  //     imgURL: 'chara_5_link_00.png'
  //   },
  //   {
  //     name: 'samus',
  //     imgURL: 'chara_5_samus_00.png'
  //   },
  //   {
  //     name: 'dark samus',
  //     imgURL: 'chara_5_dark_samus_00.png'
  //   },
  //   {
  //     name: 'yoshi',
  //     imgURL: 'chara_5_yoshi_07.png'
  //   },
  //   {
  //     name: 'kirby',
  //     imgURL: 'chara_5_kirby_00.png'
  //   },
  //   {
  //     name: 'fox',
  //     imgURL: 'chara_5_fox_00.png'
  //   },
  //   {
  //     name: 'pikachu',
  //     imgURL: 'chara_5_pikachu_00.png'
  //   },
  //   {
  //     name: 'luigi',
  //     imgURL: 'chara_5_luigi_00.png'
  //   },
  //   {
  //     name: 'ness',
  //     imgURL: 'chara_5_ness_satan_00.png'
  //   },
  //   {
  //     name: 'captain falcon',
  //     imgURL: 'chara_5_captain_falcon_00.png'
  //   },
  //   {
  //     name: 'jigglypuff',
  //     imgURL: 'chara_5_jigglypuff_00.png'
  //   },
  //   {
  //     name: 'peach',
  //     imgURL: 'chara_5_peach_00.png'
  //   },
  //   {
  //     name: 'daisy',
  //     imgURL: 'chara_5_daisy_00.png'
  //   },
  //   {
  //     name: 'bowser',
  //     imgURL: 'chara_5_bowser_00.png'
  //   },
  //   {
  //     name: 'ice climbers',
  //     imgURL: 'chara_5_ice_climbers_00.png'
  //   },
  //   {
  //     name: 'sheik',
  //     imgURL: 'chara_5_sheik_00.png'
  //   },
  //   {
  //     name: 'zelda',
  //     imgURL: 'chara_5_zelda_00.png'
  //   },
  //   {
  //     name: 'drMario',
  //     imgURL: 'chara_5_dr_mario_00.png'
  //   },
  //   {
  //     name: 'pichu',
  //     imgURL: 'chara_5_pichu_00.png'
  //   },
  //   {
  //     name: 'falco',
  //     imgURL: 'chara_5_falco_00.png'
  //   },
  //   {
  //     name: 'marth',
  //     imgURL: 'chara_5_marth_00.png'
  //   },
  //   {
  //     name: 'Lucina',
  //     imgURL: 'chara_5_lucina_better_marth_00.png'
  //   },
  //   {
  //     name: 'young link',
  //     imgURL: 'chara_5_young_link_00.png'
  //   },
  //   {
  //     name: 'ganondorf',
  //     imgURL: 'chara_5_ganondorf_00.png'
  //   },
  //   {
  //     name: 'mewtwo',
  //     imgURL: 'chara_5_mewtwo_00.png'
  //   },
  //   {
  //     name: 'roy',
  //     imgURL: 'chara_5_roy_00.png'
  //   },
  //   {
  //     name: 'chrom',
  //     imgURL: 'chara_5_chrom_00.png'
  //   },
  //   {
  //     name: 'mr game watch',
  //     imgURL: 'chara_5_mr_game_watch_00.png'
  //   },
  //   {
  //     name: 'meta knight',
  //     imgURL: 'chara_5_metaKnight_00.png'
  //   },
  //   {
  //     name: 'pit',
  //     imgURL: 'chara_5_pit_00.png'
  //   },
  //   {
  //     name: 'dark pit',
  //     imgURL: 'chara_5_darkpit_00.png'
  //   },
  //   {
  //     name: 'zero suit samus',
  //     imgURL: 'chara_5_zss_00.png'
  //   },
  //   {
  //     name: 'wario',
  //     imgURL: 'chara_5_wario_00.png'
  //   },
  //   {
  //     name: 'snake',
  //     imgURL: 'chara_5_snake_00.png'
  //   },
  //   {
  //     name: 'ike',
  //     imgURL: 'chara_5_ike_01.png'
  //   },
  //   {
  //     name: 'squirtle',
  //     imgURL: 'chara_5_pokemon_squirtle_00.png'
  //   },
  //   {
  //     name: 'ivysaur',
  //     imgURL: 'chara_5_pokemon_ivysaur_00.png'
  //   },
  //   {
  //     name: 'charizard',
  //     imgURL: 'chara_5_pokemon_charizard_00.png'
  //   },
  //   {
  //     name: 'diddy kong',
  //     imgURL: 'chara_5_diddy_kong_00.png'
  //   },
  //   {
  //     name: 'lucas',
  //     imgURL: 'chara_5_lucas_00.png'
  //   },
  //   {
  //     name: 'sonic',
  //     imgURL: 'chara_5_sonic_00.png'
  //   },
  //   {
  //     name: 'king dedede',
  //     imgURL: 'chara_5_dedede_00.png'
  //   },
  //   {
  //     name: 'olimar',
  //     imgURL: 'chara_5_olimar_00.png'
  //   },
  //   {
  //     name: 'lucario',
  //     imgURL: 'chara_5_lucario_00.png'
  //   },
  //   {
  //     name: 'rob',
  //     imgURL: 'chara_5_rob_01.png'
  //   },
  //   {
  //     name: 'toon link',
  //     imgURL: 'chara_5_toon_link_00.png'
  //   },
  //   {
  //     name: 'wolf',
  //     imgURL: 'chara_5_wolf_00.png'
  //   },
  //   {
  //     name: 'villager',
  //     imgURL: 'chara_5_villager_00.png'
  //   },
  //   {
  //     name: 'mega man',
  //     imgURL: 'chara_5_megaman_00.png'
  //   },
  //   {
  //     name: 'wii fit trainer',
  //     imgURL: 'chara_5_wiifit_00.png'
  //   },
  //   {
  //     name: 'rosalina & Luma',
  //     imgURL: 'chara_5_rosalina_luma_00.png'
  //   },
  //   {
  //     name: 'little mac',
  //     imgURL: 'chara_5_littlemac_00.png'
  //   },
  //   {
  //     name: 'greninja',
  //     imgURL: 'chara_5_greninja_00.png'
  //   },
  //   {
  //     name: 'mii brawler',
  //     imgURL: 'chara_5_miibrawler_00.png'
  //   },
  //   {
  //     name: 'mii swordfighter',
  //     imgURL: 'chara_5_miiswordman_00.png'
  //   },
  //   {
  //     name: 'mii gunner',
  //     imgURL: 'chara_5_miigunner_00.png'
  //   },
  //   {
  //     name: 'palutena',
  //     imgURL: 'chara_5_palutena_00.png'
  //   },
  //   {
  //     name: 'pacman',
  //     imgURL: 'chara_5_pacman_00.png'
  //   },
  //   {
  //     name: 'robin',
  //     imgURL: 'chara_5_robin_00.png'
  //   },
  //   {
  //     name: 'shulk',
  //     imgURL: 'chara_5_shulk_00.png'
  //   },
  //   {
  //     name: 'bowser jr',
  //     imgURL: 'chara_5_bowser_jr_00.png'
  //   },
  //   {
  //     name: 'duckHunt',
  //     imgURL: 'chara_5_duckhunt_00.png'
  //   },
  //   {
  //     name: 'ryu',
  //     imgURL: 'chara_5_ryu_00.png'
  //   },
  //   {
  //     name: 'ken',
  //     imgURL: 'chara_5_ken_00.png'
  //   },
  //   {
  //     name: 'cloud',
  //     imgURL: 'chara_5_cloud_01.png'
  //   },
  //   {
  //     name: 'corrin',
  //     imgURL: 'chara_5_corrin_00.png'
  //   },
  //   {
  //     name: 'bayonetta',
  //     imgURL: 'chara_5_bayonetta_00.png'
  //   },
  //   {
  //     name: 'inkling',
  //     imgURL: 'chara_5_inkling_00.png'
  //   },
  //   {
  //     name: 'ridley',
  //     imgURL: 'chara_5_ridley_00.png'
  //   },
  //   {
  //     name: 'simon',
  //     imgURL: 'chara_5_simon_00.png'
  //   },
  //   {
  //     name: 'richter',
  //     imgURL: 'chara_5_richter_00.png'
  //   },
  //   {
  //     name: 'King K Rool',
  //     imgURL: 'chara_5_krool_00.png'
  //   },
  //   {
  //     name: 'isabelle',
  //     imgURL: 'chara_5_isabelle_00.png'
  //   },
  //   {
  //     name: 'incineroar',
  //     imgURL: 'chara_5_incineroar_00.png'
  //   },
  //   {
  //     name: 'piranha plant',
  //     imgURL: 'chara_5_piranha_plant_00.png'
  //   },
  //   {
  //     name: 'joker',
  //     imgURL: 'chara_5_joker_00.png'
  //   },
  //   {
  //     name: 'hero',
  //     imgURL: 'chara_5_hero_01.png'
  //   },
  //   {
  //     name: 'banjo',
  //     imgURL: 'chara_5_banjo_00.png'
  //   },
  //   {
  //     name: 'terry',
  //     imgURL: 'chara_5_terry_00.png'
  //   },
  //   {
  //     name: 'byleth',
  //     imgURL: 'chara_5_byleth_01.png'
  //   },
  //   {
  //     name: 'min min',
  //     imgURL: 'chara_5_min_min_00.png'
  //   },
  //   {
  //     name: 'steve',
  //     imgURL: 'chara_5_steve_00.png'
  //   },
  //   {
  //     name: 'sephiroth',
  //     imgURL: 'chara_5_sephiroth_00.png'
  //   },
  //   {
  //     name: 'pyra',
  //     imgURL: 'chara_5_pyra_00.png'
  //   },
  //   {
  //     name: 'mythra',
  //     imgURL: 'chara_5_mythra_00.png'
  //   },
  //   {
  //     name: 'kazuya',
  //     imgURL: 'chara_5_kazuya_01.png'
  //   },
  //   {
  //     name: 'sora',
  //     imgURL: 'chara_5_sora_04.png'
  //   }
  // ]
};
