export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}

export interface Move {
  name: string;
  power: number;
  accuracy: number;
  type: {
    name: string;
  };
} 