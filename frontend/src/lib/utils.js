export const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);

    const avatarStyles = [
        // --- REALISTIC ---
        `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}.png`,
        `https://avatar.iran.liara.run/public/boy?seed=${randomSeed}`,
        `https://avatar.iran.liara.run/public/girl?seed=${randomSeed}`,

        // --- CARTOON & CHARACTERS ---
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/open-peeps/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/big-smile/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/dylan/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/micah/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/miniavs/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/personas/svg?seed=${randomSeed}`,

        // --- ARTISTIC & ABSTRACT ---
        `https://api.dicebear.com/7.x/lorelei/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/notionists/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/croodles/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/croodles-neutral/svg?seed=${randomSeed}`,

        // --- ROBOTS, PIXELS & SHAPES ---
        `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/shapes/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/thumbs/svg?seed=${randomSeed}`,
        `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${randomSeed}`,
    ];

    return avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
}