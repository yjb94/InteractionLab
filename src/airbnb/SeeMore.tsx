import React from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type SeeMoreProps = {};

const SeeMore: React.FC<SeeMoreProps> = ({}) => {
  const { styles } = useStyles(stylesheet);

  const renderBulletItem = (title: string, information: string) => {
    return (
      <View style={styles.bulletItem}>
        <Text style={styles.boldText}>{`• `}</Text>
        <Text style={styles.text}>
          <Text style={styles.boldText}>{`${title}: `}</Text>
          {information}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <View style={styles.section}>
        <Text style={styles.boldText}>
          Highlight the charm of the tiny house:
        </Text>
      </View>
      {renderBulletItem(
        "Cozy and efficient",
        "Perfect for couples or solo adventurers seeking a comfortable and intimate space."
      )}
      {renderBulletItem(
        "Big amenities in a small space",
        "Don't be fooled by the size! This tiny house boasts a full 3-piece bathroom and a well-equipped kitchenette for whipping up meals."
      )}
      {renderBulletItem(
        "Relaxing retreat",
        "Unwind in the living room with a flat-screen TV after a day of exploring."
      )}
      <View style={styles.section}>
        <Text style={styles.boldText}>Emphasize the outdoor space:</Text>
      </View>
      {renderBulletItem(
        "Private oasis",
        "Enjoy your morning coffee or an evening BBQ on the spacious deck overlooking the beautiful meadow."
      )}
      {renderBulletItem(
        "Peaceful surroundings",
        "Wake up to serene meadow views, perfect for nature lovers."
      )}
      <View style={styles.section}>
        <Text style={styles.boldText}>Additional tips:</Text>
      </View>
      {renderBulletItem(
        "High-quality photos",
        "Showcase the tiny house's charm with bright and inviting photos highlighting the living space, bathroom, kitchenette, deck, and meadow view."
      )}
      {renderBulletItem(
        "House rules",
        `Clearly state your "No pets" policy to avoid any confusion with potential guests.`
      )}
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {},
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "CerealMedium",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealBook",
  },
  section: {
    marginVertical: 12,
  },
  boldText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "CerealMedium",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
});

export default SeeMore;
