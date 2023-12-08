import { Box, Heading, HStack } from "@chakra-ui/react";
import { ReactElement } from "react";

import type { Treatment as TreatmenType } from "../../../shared/types";
import { useTreatments } from "./hooks/useTreatments";
import { Treatment } from "./Treatment";

export function Treatments(): ReactElement {
  // replace with data from React Query
  const treatments: TreatmenType[] = useTreatments();
  // console.log("treatmentstreatments ", treatments);
  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Available Treatments
      </Heading>
      <HStack m={10} spacing={8} justify="center">
        {treatments.map((treatmentData) => (
          <Treatment key={treatmentData.id} treatmentData={treatmentData} />
        ))}
      </HStack>
    </Box>
  );
}
