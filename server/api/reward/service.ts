export async function calculateReward(rewardValue: number, gameTime: number) {
    if(!rewardValue || rewardValue === 0) {
        throw {
            statusCode: '',
            message: '',
        };
    }

    const finalReward = rewardValue*gameTime;
    
    return {
        initialReward: rewardValue, 
        finalReward: finalReward
    };
};